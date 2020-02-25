import uuidv4 from "uuid/v4";

const initialState = {
  user: null,
  messages: [],
  newMessage: null
};

export default (state = initialState, action) => {
  try {
    if (action.payload.data.message) {
      state = {
        ...state,
        newMessage: { ...action.payload.data.message, id: uuidv4() }
      };
    }
  } catch (error) {}

  try {
    if (action.error) {
      console.log("# action.error", action.error);
      state = {
        ...state,
        newMessage: { text: action.error.message, type: "error", id: uuidv4() }
      };
    }
  } catch (error) {}

  switch (action.type) {
    default:
      return state;
  }
};
