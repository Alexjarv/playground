<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends BaseController
{
    protected $user;

    public function __construct()
    {
        $this->middleware(['auth' => 'verified'])->except(["except" => "login", "register"]);
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

            if(!Auth::attempt($credentials, $request->remember)){

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

    public function register(Request $request){

        $validator = Validator::make($request->all(),[
            'name' => 'required|string',
            'email' => 'required|string|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->failed()
            ], 500);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        $this->user = $user;

        $responseMessage = "Registration Successful";
        $accessToken = $user->createToken('authToken')->accessToken;

        return $this->respondWithToken($accessToken, $responseMessage, $user);
    }

    public function forgotPassword(Request $request){

        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
                ? back()->with(['status' => __($status)])
                : back()->withErrors(['email' => __($status)]);
    }

    public function reset(Request $request){

        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
                    ? back()->with('status', __($status))
                    : back()->withErrors(['email' => [__($status)]]);
    }
}
