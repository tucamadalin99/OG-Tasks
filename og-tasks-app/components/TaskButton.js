import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function TaskButton(props) {
    return (
        <TouchableOpacity style={[{backgroundColor: props.bgColor}, styles.buttonWrapper]}>
            <Text style={{color: props.textColor}}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        paddingRight: 8,
        paddingLeft: 8,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 4,
        marginLeft: 8
    }
})
