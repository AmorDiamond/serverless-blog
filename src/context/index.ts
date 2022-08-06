import React from "react";

export const storeContext = React.createContext<{ userInfo?: any; changeUserInfo?: Function }>({});