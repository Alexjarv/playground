<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $user = Auth::user();
    return view('welcome', ['user' => $user]);
});


Route::group(['prefix' => 'api/auth', 'middleware' => 'api'], function ($router) {

    Route::get('/', function (){
        return response()->json(Auth::check(), 200);
    });

    Route::get('/user', function (){
        $user = Auth::user();
        if($user){
            return response()->json(Auth::user(), 200);
        } else {
            return response()->json("", 204);
        }
    });

});


// Authentication Routes...
Route::get('login', [App\Http\Controllers\Auth\LoginController::class, 'showLoginForm'])->name('login');
Route::post('logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');

// Registration Routes...
Route::get('register', [App\Http\Controllers\Auth\RegisterController::class, 'showRegistrationForm'])->name('register');

// Password Reset Routes...
Route::get('password/reset', [App\Http\Controllers\Auth\ForgotPasswordController::class, 'showLinkRequestForm']);
Route::post('password/email', [App\Http\Controllers\Auth\ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::get('password/reset/{token}', [App\Http\Controllers\Auth\ResetPasswordController::class, 'showResetForm']);
Route::post('password/reset', [App\Http\Controllers\Auth\ResetPasswordController::class, 'reset']);

Route::group(['middleware' => 'CORS'], function ($router) {
    Route::post('/register', [App\Http\Controllers\UserController::class, 'register'])->name('register.user');
    Route::post('/login', [App\Http\Controllers\UserController::class, 'login'])->name('login.user');
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
