import { FlatList, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout, PeopleItem } from '../../component';
import { statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { styles } from '../../styles';
import { goBack } from '../../functions/navigate';
import { BackArrowIcon } from '../../component/svg/svg';
import { useEffect, useState } from 'react';
import apiFetch from '../../functions/api';
 
export function NoWatchPeopleScreen() {
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [meta, setMeta] = useState({})
    const [refresh, setRefresh] = useState(false)
    
    useEffect(()=>{
        (async()=>{
            const value = await apiFetch(`/profile/hidden-users`,'GET',true)            
            if (value?.status==200) {                
                setMeta(value?.meta)
                setData(value?.data)
            }
        })();
    },[])

    const onRefresh= async(loader?:boolean, status?:number) => {
        setMeta({})
        setData([])
        
        setPage(1)
        setRefresh(true)
        setTimeout(async() => {
            const value = await apiFetch(`/profile/hidden-users`,'GET',true)            
            if (value?.status==200) {
                setMeta(value?.meta)
                setData(value?.data)
            }
            setRefresh(false)
        }, 1000);
        
        
    }

    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
             <View style={{marginTop:statusBarHeight+19, marginBottom:9}}>
                <View style={{marginHorizontal:16, justifyContent:'space-between', flexDirection:"row", alignItems:"center"}}>
                    <TouchableOpacity activeOpacity={0.7} onPress={goBack} style={{width:42, height:42, alignItems:"center", justifyContent:"center", backgroundColor:'#221E1E80', borderRadius:16}}>
                        <BackArrowIcon/>
                    </TouchableOpacity>
                    <Text style={[styles.additional, {color:'white'}]}>Больше не показывать</Text>
                    <View  style={{width:42, height:42}}/>
                </View>
            </View>
            <FlatList
                data={data}
                refreshControl={<RefreshControl
                    refreshing={refresh}
                    colors={[Бирюзовый]}
                    progressBackgroundColor={'#181818'}
                    onRefresh={onRefresh}
                />}
                onEndReachedThreshold={0.8}
                onEndReached={async()=>{
                    if (meta?.last_page>page) {
                        const value = await apiFetch(`/profile/hidden-users?page=${page+1}`,'GET', true)
                        setPage(page+1)
                        setMeta(value.meta)
                        setData(prevState => ([...prevState, ...value.data]))
                    }
                }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(el,i)=>i.toString()}
                style={{flexGrow:1}}
                columnWrapperStyle={{justifyContent:"space-between", width:width-32}}
                contentContainerStyle={{
                    width:width, 
                    alignItems:"center",
                    gap:8, 
                    marginBottom:30,
                }}
                renderItem={({item})=><PeopleItem data={item}/>}
            />
            {/* <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : 'height'}
                    keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                    style={{ flex: 1 }}
                >
                   
                    <View style={{alignItems:"center"}}>
                        <View style={styles.eventPeopleImgContainer}>
                            {[1,2,3,4,5].map((el,i)=><PeopleItem key={i}/>)}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView> */}
        </MainLayout>
    )
}