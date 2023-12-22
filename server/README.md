# A. Sign Up Operations
### Admin user is already created in the backend, this is for user signup

## 1. Creating Users

    - Method: POST
    - Endpoint: /users
    - Params: -
    - Body: {
                "username": "String",
                "password": "String",
                "name": "String",
                "email": "String",
                "contactNumber": "String",
                "role": "user"(Default) || "admin"
            }

## 2. Viewing Users

    - Method: GET
    - Endpoint: /users
    - Params: -
    - Body: -

## 3. Viewing a Single User

    - Method: GET
    - Endpoint: /users/:id
    - Params: id of the user
    - Body: -

## 4. Deleting a Single User

    - Method: DELETE
    - Endpoint: /users/:id
    - Params: id of the user
    - Body: -


# B. Login/Logout
### After signup, use username and password to login

## 1. Logging in

    - Method: POST
    - Endpoint: /login
    - Params: -
    - Body: {
                "username": "String",
                "password": "String"
            }

## 2. Logging out

    - Method: GET
    - Endpoint: /logout
    - Params: -
    - Body: -


# C. After authentication - for both Admin and User
### These routes can be used by both admin and user upon authentication

## 1. Get all books

    - Method: GET
    - Endpoint: /books
    - Params: -
    - Body: -


# D. After authentication - only for User
### These routes can be used by only user upon authentication

## 1. Request borrowing a book

    - Method: POST
    - Endpoint: /libraryTransactions/requestBook
    - Params: -
    - Body: {
                "user": "String: User ID",
                "book": "String: Book ID",
                "transactionType": "borrowed"(ALWAYS)
            }

## 2. Return a borrowed book that was approved by admin - can only do after due date which is 2 days after the date of borrow

    - Method: GET
    - Endpoint: /libraryTransactions/returnBook
    - Params: -
    - Body: {
                "user": "String: User ID",
                "book": "String: Book ID",
                "transactionType": "returned"(ALWAYS)
            }

## 3. Get all transactions for the user

    - Method: GET
    - Endpoint: /libraryTransactions
    - Params: -
    - Body: -


# E. After authentication - only for Admin
### These routes can be used by only admin upon authentication

## 1. Add a book

    - Method: POST
    - Endpoint: /books
    - Params: -
    - Body: {
                "name": "String",
                "author": "String",
                "currentAvailabilityStatus": Boolean(available: true, unavailable: false)
            }

## 2. Update book availability

    - Method: PUT
    - Endpoint: /books/:id
    - Params: id of the book
    - Body: {
                "availabilityStatus": Boolean(available: true, unavailable: false)
            }

## 3. Remove a book

    - Method: DELETE
    - Endpoint: /books/:id
    - Params: id of the book
    - Body: -

## 4. Approve a book borrow request

    - Method: PUT
    - Endpoint: /libraryTransactions/approveBookRequest
    - Params: -
    - Body: {
                "transactionId": "String: Transaction ID of the borrow request"
            }

## 5. Delete a transaction(return/borrow)

    - Method: DELETE
    - Endpoint: /libraryTransactions/:id
    - Params: id of the transaction(return/borrow)
    - Body: -

## 6. Get all transactions

    - Method: GET
    - Endpoint: /libraryTransactions
    - Params: -
    - Body: -