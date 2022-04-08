<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends BaseController
{
    protected $user;

    public function __construct()
    {
        $this->middleware("auth:api", ["except" => "login", "register"]);
        $this->user = new User();
    }

    public function respondWithToken($token, $responseMessage, $data){

        return \response()->json([
            "success" => true,
            "message" => $responseMessage,
            "data" => $data,
            "token" => $token,
            "token_type" => "bearer",
        ],200);

    }

    public function login(Request $request){

        $validator = Validator::make($request->all(),[
            'email' => 'required|string',
            'password' => 'required|min:6',
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->failed()
            ], 500);
        }

        $credentials = $request->only(["email","password"]);

        $user = User::where('email',$credentials['email'])->first();

        if($user){

            if(!Auth::attempt($credentials)){

                $responseMessage = "Invalid username or password";

                return response()->json([
                    "success" => false,
                    "message" => $responseMessage,
                    "error" => $responseMessage
                ], 422);
            }

            $accessToken = $user->createToken('authToken')->accessToken;
            $responseMessage = "Login Successful";

            return $this->respondWithToken($accessToken, $responseMessage, $user);

        } else {

            $responseMessage = "Sorry, this user does not exist";
            return response()->json([
                "success" => false,
                "message" => $responseMessage,
                "error" => $responseMessage
            ], 422);

        }
    }

}
