import React, { createContext, useContext, useReducer } from 'react';

const AttendanceContext = createContext();

const initialState = {
  attendees: [],
};

const attendanceReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ATTENDEES':
      return {
        ...state,
        attendees: action.payload,
      };
    default:
      return state;
  }
};

const AttendanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(attendanceReducer, initialState);

  const updateAttendees = (newAttendees) => {
    dispatch({ type: 'UPDATE_ATTENDEES', payload: newAttendees });
  };

  return (
    <AttendanceContext.Provider value={{ attendees: state.attendees, updateAttendees }}>
      {children}
    </AttendanceContext.Provider>
  );
};

const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};

export { AttendanceProvider, useAttendance };
