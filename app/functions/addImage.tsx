import { manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

/** Позволяет выбрать изображения
 * @param event Выбрать что использовать 
 * @argument Lib - открывает Галерею
 * @argument Camera - открывает Камеру
 * @param allowsEditing Будет-ли редактироваться изображение или нет
 * @param allowsMultipleSelection Выбрать несколько картинок (только для Lib)
 * @returns Возвращает путь к изображению
 */
export async function addImage(event:string, allowsEditing=false, allowsMultipleSelection=false, selectionLimit=10) {
    switch (event) {
        case "Lib":
            const permLib = await ImagePicker.requestMediaLibraryPermissionsAsync()            
            if (permLib.granted) {
                let result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: allowsMultipleSelection ? false : allowsEditing,
                    aspect: [414, 417],
                    quality: 1,
                    allowsMultipleSelection: allowsMultipleSelection,
                    selectionLimit:selectionLimit,
                    orderedSelection:true
                });
                delete result.cancelled;
                const paths = []
                for (let index = 0; index < result.assets.length; index++) {
                    if (result.assets[index].width < result.assets[index].height) {
                        if (result.assets[index].height > 1600) {
                            const manipResultLib = await manipulateAsync(
                                result.assets[index].uri, 
                                [{resize:{height:1600}}],
                                { compress: 0.9}
                            );
                            paths.push(manipResultLib.uri)
                        } else {
                            paths.push(result.assets[index].uri)
                        }
                    } else {
                        if (result.assets[index].width > 1600) {
                            const manipResultLib = await manipulateAsync(
                                result.assets[index].uri, 
                                [{resize:{width:1600}}],
                                { compress: 0.9 }
                            ); 
                            paths.push(manipResultLib.uri)
                        } else {
                            paths.push(result.assets[index].uri)
                        }
                    }
                }
                return paths
            } else{
                return []
            }
        break;
        case "Camera":
            const permCamera = await ImagePicker.requestCameraPermissionsAsync()  
            if (permCamera.granted) {
                let resultCam = await ImagePicker.launchCameraAsync({
                    allowsEditing: allowsEditing,
                    aspect: [414, 417],
                    quality: 1,
                });
                delete resultCam.cancelled;
                
                if (resultCam?.assets[0].width < resultCam?.assets[0].height) {
                    if (resultCam.assets[0].height > 1600) {
                        const manipResultLib = await manipulateAsync(
                            resultCam.assets[0].uri, 
                            [{resize:{height:1600}}],
                            { compress: 0.9}
                        );
                        
                        return [manipResultLib.uri];
                    } else {
                        return [resultCam.assets[0].uri];
                    }
                } else {
                    if (resultCam.assets[0].width > 1600) {
                        const manipResultLib = await manipulateAsync(
                            resultCam.assets[0].uri, 
                            [{resize:{width:1600}}],
                            { compress: 0.9 }
                        ); return [manipResultLib.uri];
                    } else {
                        return [resultCam.assets[0].uri];
                    }
                }
            }
        break;
    }
};

export const fileExpansion = (value, type) => {
    if (!!value) {
        return type+'/'+value.split('/').pop().split('.')[1]
    } else {
        return null
    }
}

export const fileName = (value:string) => {
    if (!!value) {
        return value.split('/').pop().split('.')[0]
    } else {
        return ''
    }
}