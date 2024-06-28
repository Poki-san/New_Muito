import { URL } from '../GLOBAL'
import NetInfo from "@react-native-community/netinfo"
import user from '../model/token'
import error from '../model/error';
import preloader from './preloader';
import { CommonActions } from '@react-navigation/native';
import { navigationRef } from '../navigate/navigateProps';
import { Platform } from 'react-native';

/**
 * Отправляет запрос и получает данные в виде JSON
 * @param url - ссылка для получения JSON данных (Без домена)
 */
function apiFetch(url:string):any;
/**
 * Отправляет запрос и получает данные в виде JSON
 * @param url - ссылка для получения JSON данных (Без домена)
 * @param method - метод запроса POST, GET, PUT, DELETE
 */
function apiFetch(url:string, method:string):any;
/**
 * Отправляет запрос и получает данные в виде JSON
 * @param url - ссылка для получения JSON данных (Без домена)
 * @param method - метод запроса POST, GET, PUT, DELETE, PATCH
 * @param token - токен пользователя
 */
function apiFetch(url:string, method:string, token:boolean):any;

/**
 * Отправляет запрос и получает данные в виде JSON
 * @param url - ссылка для получения JSON данных (Без домена)
 * @param method - метод запроса POST, GET, PUT, DELETE, PATCH
 * @param token - токен пользователя (true или false)
 * @param values - объект для отправки
 */
function apiFetch(url:string, method:string, token?:boolean, values?:object):any;
async function apiFetch(url:string, method?:string, token?:boolean, values?:object) {
    let connect:any;
    
    preloader.Input(true);
    
    await NetInfo.fetch().then(state => connect = state.isConnected);
    if (connect) {
        try {
            const jsonOutput = await fetch(URL + url, method? {
                method:method,
                headers: token ? {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;',
                    'Authorization': `Bearer ${user.token}`
                  } : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;'
                  },
                body: values? JSON.stringify(values) : undefined
            } : undefined)
                
                if (jsonOutput.status != 401) {
                    const result = await jsonOutput.json();
                    if (!!result?.exception) {
                        setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 500);
                        
                    }
                    return {...result, status:jsonOutput.status};
                } else {
                    user.userClear()
                    const bottomReset = CommonActions.reset({
                        index: 0,
                        routes: [{name: 'Auth'}],
                    });
                    navigationRef.current?.dispatch(bottomReset)
                }
                
        } catch (err) {
            setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 500);
        } finally {
            preloader.Input(false);
        }
    } else {
        preloader.Input(false);
        const temp = {noInet:true};
        setTimeout(() => error.Input(true,'Нету подключения к интернету!','Упс!...', Platform.OS=='ios'?175:145), 500);
        return temp;
    }
}
/**
 * Отправляет запрос (FORMDATA) и получает данные в виде JSON
 * @param url - ссылка для получения JSON данных (Без домена)
 * @param method - метод запроса POST, GET, PUT, DELETE, PATCH
 * @param token - токен пользователя (true или false)
 * @param values - FormData для отправки файлов
 */
export async function apiFetchFile(url:string, method:string, token:boolean, values:FormData) {
    let connect:any;
    preloader.Input(true);
    
    await NetInfo.fetch().then(state => connect = state.isConnected);
    if (connect) {
        try {
            const jsonOutput = await fetch(URL + url,{
                method:method,
                headers: token ? {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                  } : {
                    'Accept': 'application/json',
                  },
                  body: values
            })   
            
            preloader.Input(false);
            
            if (jsonOutput.status != 401) {
                const result = await jsonOutput.json();
                if (!!result?.exception) {
                    setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 500);
                }
                return {...result, status:jsonOutput.status};
            } else {
                user.userClear()
                // chatAuth.reconnectInput(false)
                const bottomReset = CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Auth'}],
                });
                navigationRef.current?.dispatch(bottomReset)
            }
        } catch (err) {
            console.log(err);
            
            preloader.Input(false);
            setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 500);
        }
    } else {
        const temp = {noInet:true};
        setTimeout(() => error.Input(true,'Нету подключения к интернету!','Упс!...', Platform.OS=='ios'?175:145), 500);
        preloader.Input(false);
        return temp;
    }
}

export async function apiFetchNoStatus(url:string, method?:string, token?:boolean, values?:object) {
    let connect:any;
    
    preloader.Input(true);
    
    await NetInfo.fetch().then(state => connect = state.isConnected);
    if (connect) {
        try {
            const jsonOutput = await fetch(URL + url, method? {
                method:method,
                headers: token ? {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;',
                    'Authorization': `Bearer ${user.token}`
                  } : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;'
                  },
                body: values? JSON.stringify(values) : undefined
            } : undefined)
                
                if (jsonOutput.status != 401) {
                    const result = await jsonOutput.json();
                    if (!!result?.exception) {
                        setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 500);
                        
                    }
                    return result;
                } else {
                    user.userClear()
                    const bottomReset = CommonActions.reset({
                        index: 0,
                        routes: [{name: 'Auth'}],
                    });
                    navigationRef.current?.dispatch(bottomReset)
                }
                
        } catch (err) {
            setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 500);
        } finally {
            preloader.Input(false);
        }
    } else {
        preloader.Input(false);
        const temp = {noInet:true};
        setTimeout(() => error.Input(true,'Нету подключения к интернету!','Упс!...', Platform.OS=='ios'?175:145), 500);
        return temp;
    }
}

export async function apiFetchString(url:string, method?:string, token?:string, values?:object) {
    let connect:any;
    
    preloader.Input(true);
    
    await NetInfo.fetch().then(state => connect = state.isConnected);
    if (connect) {
        try {
            const jsonOutput = await fetch(URL + url, method? {
                method:method,
                headers:  {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;',
                    'Authorization': `Bearer ${token}`
                  } ,
                body: values? JSON.stringify(values) : undefined
            } : undefined)
                
                if (jsonOutput.status != 401) {
                    const result = await jsonOutput.json();
                    if (!!result?.exception) {
                        setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 500);
                    }
                    return {...result, status:jsonOutput.status};
                } else {
                    user.userClear()
                    const bottomReset = CommonActions.reset({
                        index: 0,
                        routes: [{name: 'Auth'}],
                    });
                    navigationRef.current?.dispatch(bottomReset)
                }
                
        } catch (err) {
            setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 500);
        } finally {
            preloader.Input(false);
        }
    } else {
        preloader.Input(false);
        const temp = {noInet:true};
        setTimeout(() => error.Input(true,'Нету подключения к интернету!','Упс!...', Platform.OS=='ios'?175:145), 500);
        return temp;
    }
}

export default apiFetch 