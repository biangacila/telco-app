import {Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, {useEffect, useState} from "react";
import {Transaction} from "@/types/type-model";
import {Colors} from "@/constants/Colors";
import {formatDate2} from "@/services/functions";

type Props = {
    data: Transaction[];
    onPress: any;
};

const { height, width } = Dimensions.get("screen");

export default (props: Props) => {
    const { data, onPress } = props;

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState<Transaction[]>(data||[]);

    useEffect(() => {
        setFilteredData(data?data:[])
    }, []);
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        /*if(searchQuery === ""){
            setFilteredData(data);
            return
        }*/
        /*// Filter the data based on the query
        const filtered = data.filter((item) => {
            return (
                item.ExtRef?.toLowerCase().includes(query.toLowerCase()) ||
                item.ApiRef?.toLowerCase().includes(query.toLowerCase())
            );
        });*/

        //setFilteredData(filtered);
    };

    const getTransList=():Transaction[]=>{
        let query = searchQuery
        if(query===""){
            return data
        }
        // Filter the data based on the query
        return data.filter((item) => {
            return (
                item.ExtRef?.toLowerCase().includes(query.toLowerCase()) ||
                item.ApiRef?.toLowerCase().includes(query.toLowerCase())
            );
        })
    }

    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => onPress(item)}>
            <View style={styles.transactionItem}>
                <View style={styles.infoContainer}>
                    <Text style={styles.phone}>{item.ExtRef}</Text>
                    <Text style={styles.amount}>R{item.TransAmount}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.category}>Old: R{item.OldBalance}</Text>
                    <Text style={styles.category}>New: R{item.NewBalance}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>R: {item.ApiRef}</Text>
                    <Text style={styles.date}>
                        {formatDate2(item.TransDate + " " + item.TransTime)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search transactions..."
                value={searchQuery}
                onChangeText={handleSearch}
                keyboardType={"numeric"}
            />
            <FlatList
                data={getTransList()}
                renderItem={renderItem}
                keyExtractor={(item) => item.Id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 20,
    },
    searchInput: {
        height: 45,
        borderColor: Colors.brand.blue,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        width:width - 80,
        justifyContent: "center",
        alignItems:"center"
    },
    name: {},
    category: {},
    amount: {
        fontSize: 18,
        color: Colors.brand.red,
    },
    date: {
        color: Colors.brand.blue,
    },
    phone: {
        fontSize: 16,
        fontWeight: "normal",
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minWidth: width - 60,
        paddingHorizontal: 10,
    },
    transactionItem: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#f8f8f8",
        marginBottom: 10,
        borderRadius: 10,
        elevation: 1, // To give a slight shadow
        width: "100%",
        paddingHorizontal: 10,
    },
});
