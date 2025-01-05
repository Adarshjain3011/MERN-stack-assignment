import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null, // Corrected from `data` to `userData` for consistency
    receivedFriendRequests: null,
    sentFriendRequests: null, // Array to store sent friend requests
    friends: null, // Array to store friends list
    error: null, // Holds error messages, if any
    loading: false, // Indicates loading state for user actions
    loggedIn: false, // Tracks if the user is logged in
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Set user data on successful login or data fetch
        setUserData: (state, action) => {
            state.userData = action.payload; // Assign user data
            state.error = null;
            state.loading = false;
            state.loggedIn = true;
        },

        // Clear user data on logout or session expiration
        clearUserData: (state) => {
            state.userData = null;
            state.error = null;
            state.loading = false;
            state.loggedIn = false;
            state.receivedFriendRequests = [];
            state.sentFriendRequests = [];
            state.friends = [];
        },

        // Add a friend to the list
        addFriend: (state, action) => {
            if (!state.friends) {
                state.friends = []; // Initialize the friends array if it doesn't exist
            }

            if (Array.isArray(action.payload)) {
                // Merge new friends array into existing friends, avoiding duplicates
                state.friends = [
                    ...state.friends,
                    ...action.payload.filter(
                        (newFriend) => !state.friends.some((friend) => friend == newFriend.id)
                    ),
                ];
            } else {
                // Add a single friend if it's not already in the list
                const exists = state.friends.some((friend) => friend.id === action.payload.id);
                if (!exists) {
                    state.friends.push(action.payload);
                }
            }
        },

        // Remove a friend from the list
        removeFriend: (state, action) => {
            state.friends = state.friends.filter(
                (friend) => friend !== action.payload // Remove friend by ID
            );
        },

        addSentFriendRequest: (state, action) => {
            if (!state.sentFriendRequests) {
                state.sentFriendRequests = []; // Initialize if null
            }

            if (Array.isArray(action.payload)) {
                // Merge new requests into existing list, avoiding duplicates
                state.sentFriendRequests = [
                    ...state.sentFriendRequests,
                    ...action.payload.filter(
                        (newRequest) => !state.sentFriendRequests.some(
                            (request) => request == newRequest.id
                        )
                    ),
                ];
            } else {
                // Add a single request if it's not already in the list
                const exists = state.sentFriendRequests.some(
                    (request) => request === action.payload.id
                );
                if (!exists) {
                    state.sentFriendRequests.push(action.payload);
                }
            }
        },

        removeSentFriendRequest: (state, action) => {

            console.log("te",action.payload)
            state.sentFriendRequests = state.sentFriendRequests.filter(
                (request) => request != action.payload // Remove request by ID
            );
            
            console.log('Updated sentFriendRequests:', state.sentFriendRequests);
        },
        

        // Add a received friend request
        addReceivedFriendRequest: (state, action) => {
            if (!state.receivedFriendRequests) {
                state.receivedFriendRequests = []; // Initialize if null
            }

            if (Array.isArray(action.payload)) {
                // Merge new requests into existing list, avoiding duplicates
                state.receivedFriendRequests = [
                    ...state.receivedFriendRequests,
                    ...action.payload.filter(
                        (newRequest) => !state.receivedFriendRequests.some(
                            (request) => request.id === newRequest.id
                        )
                    ),
                ];
            } else {
                // Add a single request if it's not already in the list
                const exists = state.receivedFriendRequests.some(
                    (request) => request.id === action.payload.id
                );
                if (!exists) {
                    state.receivedFriendRequests.push(action.payload);
                }
            }
        },

        // Clear error messages
        clearError: (state) => {
            state.error = null;
        },

        // Set loading state
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        // Handle error messages
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

// Export actions for dispatching
export const {
    setUserData,
    clearUserData,
    addFriend,
    removeFriend,
    addSentFriendRequest,
    addReceivedFriendRequest,
    clearError,
    setLoading,
    setError,
    removeSentFriendRequest
} = userSlice.actions;

// Export the reducer to include in the store
export default userSlice.reducer;
