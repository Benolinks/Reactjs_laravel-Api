<?php

namespace App\Http\Controllers;


use App\Models\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //

    public function create(Request $request){


      

       

       $data = Validator::make($request->all(), [
    'firstname' => 'required|string|max:255',
    'lastname' => 'required|string|max:255',
    'email' => 'required|string|email|max:255|unique:users,email',
    'password' => 'required|string|min:8|confirmed',
]);

        if ($data->fails()) {
            return response()->json([
                'message'=> 'Attempt failed',
                'errors' => $data->errors(),
                'verified' => false,
            ], 422);
        }

       $validatedUser = $data->validated();

Create::create([
    'firstname' => $validatedUser['firstname'],
    'lastname' => $validatedUser['lastname'],
    'email' => $validatedUser['email'],
    'password' => Hash::make($validatedUser['password']),
    
]);

        return response()->json([
          'message' =>  'User created successfully',
          'verified' => true,
            ]);

           
    }
}
