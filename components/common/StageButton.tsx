
import { Dimensions,TouchableOpacity,Text} from "react-native"
import styled from "styled-components/native";
import {Colors} from "@/constants/Colors";
import {GenericButton1} from "@/types/type-model";

const {width, height} = Dimensions.get("screen")
interface Props extends GenericButton1{

}

export default (props:Props)=>{
    return(
        <TouchableOpacity
            onPress={()=>props.onPress(props.record)}
        >
            <Container
                color={props.bgColor}
                minHeight={props.minHeight||40}
                borderColor={props.borderColor||Colors.brand.lightGray}
                width={props.width?props.width:width-40}
            >
                <Label color={props.labelColor}>
                    {props.position?<Text>{props.position}. </Text>:null}
                    {props.label}
                </Label>
            </Container>
        </TouchableOpacity>
    )
}

const Label = styled.Text<any>`
    text-align: center;
    color: ${(props: { color: any; }) => props.color};
    font-weight: bold;
    font-size: 16px;
`
const Container = styled.View<{
    color: string,
    minHeight:number,
    borderColor:string,
    width:any,
}>`
    border-color: ${(props: { borderColor: any; }) => props.borderColor};
    font-size: 16px;
    border-width: 1px;
    min-height: ${(props: { minHeight: any; })=>props.minHeight}px;
    background-color: ${(props: { color: any; })=>props.color};
    width: ${(props: { width: any; })=>props.width}px;
    margin-top: 10px;
    border-radius: 8px;
    align-items: center;
    display: flex;
    justify-content: center;
`;
