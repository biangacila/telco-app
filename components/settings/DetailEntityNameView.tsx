import {ScrollView, View} from "react-native";
import FilterSelections, {Record} from "@/components/settings/FilterSelections";
import React, {useEffect, useState} from "react";
import moment from "moment"
import {FetchDataFromDomainDrivenGet, FetchDataFromDomainDrivenPost} from "@/services/service-domain-driven";
import {SERVER_AUTH_SERVICE} from "@/config/server-connection";
import {User2} from "@/types/type-model";
import {useSelector} from "react-redux";
import ChooseUser from "@/components/settings/ChooseUser";


type Props = {
    title: string,
    role: string,
    selectedItemName:string,
    record: any,
    onClose: any,
    onAddUser: any,
    avoidKey?: string[]
    dateField?: string[]
    dateFormat?: string,
}

export default (props: Props) => {
    const buildData = (): Record[] => {
        let ls: Record[] = []
        for (let i in props.record) {
            let value = props.record[i]
            let key = i;
            if (props.avoidKey) {
                if (props.avoidKey.includes(key)) {
                    continue
                }
            }
            if (props.dateField) {
                if (props.dateField.includes(key)) {
                    value = moment(value).format("DD-MM-YYYY HH:mm")
                    if (props.dateFormat) {
                        value = moment(value).format(props.dateFormat)
                    }
                }
            }
            ls.push({
                key,
                value,
            })
        }

        return ls
    }
    return (
        <ScrollView style={{paddingTop:16,marginBottom:100}}>
            <FilterSelections
                action={props.title}
                data={buildData()}
                includeTitle={true}
            />

            <View>
                <ChooseUser
                    category={props.role}
                    selectedItem={props.selectedItemName}
                    saveUser={(u:any)=>props.onAddUser(u)}
                />
            </View>

        </ScrollView>
    )

}
