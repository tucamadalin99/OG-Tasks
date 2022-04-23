import { useLocation } from "react-router-native";
import { Text, TextInput, View } from "react-native";

export default function TaskDetailsPage(props) {
    const location = useLocation();

    return (
        <View>
            <TextInput value={location.state.text}></TextInput>
        </View>
    )
}