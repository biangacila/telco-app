import React, { useEffect, useState } from 'react';
import { TouchableHighlight, View, StyleSheet, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import Colors from '@/constants/Colors';
import PictureManagement from '@/components/common/PictureManagement';
import moment from 'moment';
import { UploaderImageLocal } from '@/services/serviced-uploader';
import {onLayout} from "@/services/service-common";

type Props = {
    value: string,
    label: string,
    onChange: (img: string) => void,
    prevSize: number,
    onClose: () => void,
    saveIt?: boolean
}

const defaultImageUrl = "https://taj.im/wp-content/uploads/2016/02/default.jpg";

const InputImagePicker: React.FC<Props> = (props) => {
    const [sync, setSync] = useState(false);
    const [layout, setLayout] = useState({ width: 0, height: 0 });
    const [isActive, setIsActive] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>(defaultImageUrl);

    useEffect(() => {
        if (!sync) {
            setSync(true);
            if (props.value) {
                setImageUrl(props.value);
            } else if (props.value === "") {
                setImageUrl(defaultImageUrl);
            }
        }
    }, [sync, props.value]);

    const onActivePicture = () => {
        setIsActive(true);
    };

    const onDone = async (img: string) => {
        setImageUrl(img);
        props.onChange(img);
        setIsActive(false);
        if (props.saveIt) {
            await saveLocal(img);
        }
    };

    const saveLocal = async (base64String: string) => {
        const dateTime = moment().format("YYYYMMDDHHmmSS");
        const fileName = `${props.label}--${dateTime}.png`;
        await UploaderImageLocal(base64String, fileName, (resUrl: string) => {
            props.onChange(resUrl);
            setImageUrl(resUrl);
        });
    };

    const RenderPreview = () => (
        <TouchableHighlight
            onPress={onActivePicture}
            style={{
                width: layout.width,
                paddingHorizontal: 10
            }}
        >
            <>
                <Text>{props.label}</Text>
                <View style={styles.previewContainer}>
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.previewImage}
                    />
                    <DescLabel width={layout.width - 80}>
                        <Text style={styles.previewTitle}>
                            Click here to change your image source,
                            By clicking anywhere in this box you activate
                            your camera.
                        </Text>
                    </DescLabel>
                </View>
            </>
        </TouchableHighlight>
    );

    const RenderPicker = () => {
        if (!isActive) {
            return <RenderPreview />;
        }
        return (
            <PictureManagement
                StartCamera={isActive}
                donePicture={onDone}
                cancelPhoto={() => setIsActive(false)}
                cameraType="front"
            />
        );
    };

    return (
        <View onLayout={(event: any) => onLayout(event, setLayout)}>
            {RenderPicker()}
        </View>
    );
};

const DescLabel = styled.View`
    width: ${(props: any) => props.width}px;
    min-height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
`;

const styles = StyleSheet.create({
    previewTitle: {
        color: Colors.brand.red,
        fontWeight: "normal",
        fontSize: 14,
    },
    previewImage: {
        height: 75,
        width: 75,
        resizeMode: "cover",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "blue"
    },
    previewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 75,
        borderStyle: "solid",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.brand.lightBlue,
        marginHorizontal: 0
    }
});

export default InputImagePicker;
