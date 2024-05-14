import React from "react";
import { navigationRef } from "../navigate/navigateProps";

export const goBack = () => {
    navigationRef.current?.goBack()
}

export const navigate = (screen:string, value?:any) =>{
    navigationRef.current?.navigate(screen as never, value)
}