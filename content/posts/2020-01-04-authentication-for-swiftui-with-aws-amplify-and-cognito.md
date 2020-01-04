---
template: post
title: Authentication for SwiftUI with AWS Amplify and Cognito
slug: authentication-for-swiftui-with-aws-amplify-and-cognito
draft: true
date: 2020-01-04T15:42:37.506Z
description: >-
  This guide will allow you to quickly get set up with a simple Global
  Authentication Pattern for SwiftUI.
category: Programming
tags:
  - Programming
  - SwiftUI
  - iOS
---
Assuming you have enabled authentication with `amplify add auth` and already added the appropriate dependencies to your Podfile, this guide will allow you to quickly get setup with a simple _Global Authentication Pattern_.

Create a class that represents a User. Publishing the `isAuth` variable is important.

```
//  User.swift

import AWSMobileClient
import Foundation

class User: ObservableObject {
    var id: String?
    var phone: String?
    var name: String?
    @Published var isAuth: Bool

    func getUsername() -> String? {
        if(self.isAuth) {
            return AWSMobileClient.default().username!
        } else {
            return nil
        }
    }

    init(id: String, phone: String, name: String) {
        self.id = id
        self.phone = phone
        self.name = name
        isAuth = true
    }
    
    init() {
        self.id = nil
        self.phone = nil
        self.name = nil
        self.isAuth = false
    }
}
```

In the \`SceneDelegate.swift\` file, initialize the `AWSMobileClient` and the `User` object. Add the `User` as an EnvironmentVariable.

```
//  SceneDelegate.swift

func scene(_ scene: UIScene, willConnectTo _: UISceneSession, options _: UIScene.ConnectionOptions) {

        if let windowScene = scene as? UIWindowScene {
            let window = UIWindow(windowScene: windowScene)

            var user: User = User()

            AWSMobileClient.default().initialize { userState, error in
                if let userState = userState {
                    print("UserState: \(userState.rawValue)")
                    switch userState {
                    case .signedIn:
                        let username = AWSMobileClient.default().username!
                        user = User(id: username, phone: username, name: "")
                        print("\(userState.rawValue)")
                    default:
                        print("\(userState.rawValue)")
                    }
                } else if let error = error {
                    print("error: \(error.localizedDescription)")
                }
            }

            let contentView = ContentView().environmentObject(user)
            window.rootViewController = UIHostingController(rootView: contentView)
            self.window = window
            window.makeKeyAndVisible()
        }
    }
```

Create a new View named `LoginView`. It will contain a simple SignUp and SignIn form. For this guide, amplify authentication was set up to use a phone number instead of a username or email. You can run `amplify auth update` to change your configuration. Or you can modify the following code.

```
//  LoginView.swift

struct LoginView: View {

    @EnvironmentObject var user: User

    @State private var phoneNumber: String = ""
    @State private var password: String = ""
    @State private var name: String = ""
    @State private var oneTimeCode: String = ""
    @State private var mode = 0

    var body: some View {
        return VStack {
            if mode != 2 {
                VStack {
                    Picker(selection: self.$mode, label: Text("How would you like to sign in?")) {
                        Text("Signin").tag(0)
                        Text("Signup").tag(1)
                    }.pickerStyle(SegmentedPickerStyle())
                }
            }
            if mode == 0 {
                TextField("Phone Number", text: self.$phoneNumber).textContentType(.telephoneNumber).keyboardType(.phonePad)
                TextField("Password", text: self.$password).textContentType(.newPassword)
                Button(action: {
                    self.Signin(phoneNumber: self.phoneNumber, password: self.password)
                }, label: { Text("Verify") })

            } else if mode == 1 {
                TextField("Phone Number", text: self.$phoneNumber).textContentType(.telephoneNumber).keyboardType(.phonePad)
                TextField("Name", text: self.$name).textContentType(.name).keyboardType(.alphabet)
                TextField("Password", text: self.$password).textContentType(.newPassword)
                Button(action: {
                    self.Signup(phoneNumber: self.phoneNumber, password: self.password, name: self.name)
                }, label: { Text("Complete Signup") })

            } else if mode == 2 {
                TextField("Verification Code", text: self.$oneTimeCode).textContentType(.oneTimeCode).keyboardType(.numberPad)
                Button(action: {
                    self.VerifySignup(username: self.phoneNumber, challenge: self.oneTimeCode)
                }, label: { Text("Verify") })
            }
        }
    }
}
```

Add utility functions to facilitate authentication found in the LoginView.

```
//  LoginView.swift

    func VerifySignup(username: String, challenge: String) {
        AWSMobileClient.default().confirmSignUp(username: username, confirmationCode: challenge, completionHandler: { signUpResult, error in
            if let signUpResult = signUpResult {
                switch signUpResult.signUpConfirmationState {
                case .confirmed:
                    print("User is signed up and confirmed.")
                    self.user.isAuth = true
                case .unconfirmed:
                    print("User is not confirmed and needs verification via \(signUpResult.codeDeliveryDetails!.deliveryMedium) sent at \(signUpResult.codeDeliveryDetails!.destination!)")
                    self.mode = 2
                case .unknown:
                    print("Unexpected case")
                }
            } else if let error = error {
                if let error = error as? AWSMobileClientError {
                    matchError(error: error)
                }
                print("\(error.localizedDescription)")
            }
        })
    }

    func VerifySignin(challenge: String) {
        AWSMobileClient.default().confirmSignIn(challengeResponse: challenge, completionHandler: { SignInResult, error in
            if let signInResult = SignInResult {
                print("\(signInResult.codeDetails.debugDescription)")

            } else if let error = error {
                if let error = error as? AWSMobileClientError {
                    matchError(error: error)
                }
                print("\(error.localizedDescription)")
            }
        })
    }

    func Signup(phoneNumber: String, password: String, name: String) {
        AWSMobileClient.default().signUp(username: phoneNumber,
                                         password: password,
                                         userAttributes: ["name": name, "phone_number": phoneNumber]) { signUpResult, error in
            if let signUpResult = signUpResult {
                switch signUpResult.signUpConfirmationState {
                case .confirmed:
                    print("User is signed up and confirmed")
                    self.user.isAuth = true
                case .unconfirmed:
                    print("User is not confirmed and needs verification via \(signUpResult.codeDeliveryDetails!.deliveryMedium) sent at \(signUpResult.codeDeliveryDetails!.destination!)")
                    self.mode = 2
                case .unknown:
                    print("Unexpected case")
                }
            } else if let error = error {
                if let error = error as? AWSMobileClientError {
                    matchError(error: error)
                }
                print("\(error.localizedDescription)")
            }
        }
    }

    func Signin(phoneNumber: String, password: String) {
        AWSMobileClient.default().signIn(username: phoneNumber, password: password, completionHandler: { signInResult, error in
            if let signInResult = signInResult {
                print("\(signInResult.codeDetails.debugDescription)")
            } else if let error = error {
                if let error = error as? AWSMobileClientError {
                    matchError(error: error)
                }
                print("\(error.localizedDescription)")
            }
        })
    }
```

Optionally, you can add a function to help match authentication errors.

```
//  LoginView.swift

func matchError(error: AWSMobileClientError) {
    let printableMessage: String
    switch error {
    case let .aliasExists(message): printableMessage = message
    case let .codeDeliveryFailure(message): printableMessage = message
    case let .codeMismatch(message): printableMessage = message
    case let .expiredCode(message): printableMessage = message
    case let .groupExists(message): printableMessage = message
    case let .internalError(message): printableMessage = message
    case let .invalidLambdaResponse(message): printableMessage = message
    case let .invalidOAuthFlow(message): printableMessage = message
    case let .invalidParameter(message): printableMessage = message
    case let .invalidPassword(message): printableMessage = message
    case let .invalidUserPoolConfiguration(message): printableMessage = message
    case let .limitExceeded(message): printableMessage = message
    case let .mfaMethodNotFound(message): printableMessage = message
    case let .notAuthorized(message): printableMessage = message
    case let .passwordResetRequired(message): printableMessage = message
    case let .resourceNotFound(message): printableMessage = message
    case let .scopeDoesNotExist(message): printableMessage = message
    case let .softwareTokenMFANotFound(message): printableMessage = message
    case let .tooManyFailedAttempts(message): printableMessage = message
    case let .tooManyRequests(message): printableMessage = message
    case let .unexpectedLambda(message): printableMessage = message
    case let .userLambdaValidation(message): printableMessage = message
    case let .userNotConfirmed(message): printableMessage = message
    case let .userNotFound(message): printableMessage = message
    case let .usernameExists(message): printableMessage = message
    case let .unknown(message): printableMessage = message
    case let .notSignedIn(message): printableMessage = message
    case let .identityIdUnavailable(message): printableMessage = message
    case let .guestAccessNotAllowed(message): printableMessage = message
    case let .federationProviderExists(message): printableMessage = message
    case let .cognitoIdentityPoolNotConfigured(message): printableMessage = message
    case let .unableToSignIn(message): printableMessage = message
    case let .invalidState(message): printableMessage = message
    case let .userPoolNotConfigured(message): printableMessage = message
    case let .userCancelledSignIn(message): printableMessage = message
    case let .badRequest(message): printableMessage = message
    case let .expiredRefreshToken(message): printableMessage = message
    case let .errorLoadingPage(message): printableMessage = message
    case let .securityFailed(message): printableMessage = message
    case let .idTokenNotIssued(message): printableMessage = message
    case let .idTokenAndAcceessTokenNotIssued(message): printableMessage = message
    case let .invalidConfiguration(message): printableMessage = message
    case let .deviceNotRemembered(message): printableMessage = message
    }
    print("error: \(error); message: \(printableMessage)")
}
```

Finally, add the last bit of logic to the ContentView.

```
//  ContentView.swift

import AWSMobileClient
import SwiftUI

struct ContentView: View {
    @EnvironmentObject var user: User

    var body: some View {
        if user.isAuth {
            return AnyView(MainView())
        } else {
            return AnyView(LoginView())
        }
    }
}
```
