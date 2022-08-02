import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    title: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom:3
      },
      text: {
        color: "#fff",
        marginRight: 5,
        opacity: 0.75,
      },
      coinContainer:{
        flexDirection:'row',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'grey',
        padding:10
      },rank:{
        color: '#fff',
        fontWeight: "bold",
        fontSize:12
      },rankContainer:{
        marginRight:5,
        backgroundColor:'#585858',
        paddingVertical: 3,
        paddingHorizontal:8,
        borderRadius:10
      }
})
export default styles