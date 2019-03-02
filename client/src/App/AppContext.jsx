import React from 'react';

const AppContext = React.createContext({
    isUserLoggedIn: false,
    toggleIsUserLoggedIn: () => {}
});

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
