import { StyleSheet } from 'react-native';
import {defaultStyle, commons} from '../styles/CommonStyles'
const threadNormalBgColor     = '#257DF7';

export const contactStyle = StyleSheet.create({
    contactItemContainer: {
        padding: 10
    },
    avatar: {
        width: 48,
        height: 48,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1
    },
    searchInputContainer: {
        backgroundColor: '#C9C9CE',
        height: 44,
        borderTopColor: '#7e7e7e',
        borderBottomColor: '#b5b5b5',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
    },
    searchInput: {
        backgroundColor: '#FFFFFF',
        height: 28,
        borderRadius: 5,
        paddingTop: 4.5,
        paddingBottom: 4.5,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 7.5,
        marginLeft: 8,
        marginRight: 8,
        fontSize: 15,
    },
    lastMessageText: {
        fontSize: defaultStyle.fontSize,
        padding: 10
    },
    title: {
        fontSize: defaultStyle.fontSize,
        color: '#656565',
        fontWeight: 'bold',
        flex: 1
    },
    contactDivider:{
        margin: 10,
        height: 1,
        backgroundColor: '#dddddd'
    },
    contactDeleteIcon:{
        fontSize: 20,
        marginRight: 15
    },
    selectedContactsContainer:{
        flex: 1,
        flexDirection : 'row',
        flexWrap      : 'nowrap',
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15
    },
    groupImage:{
        width: 48,
        height: 48,
        borderRadius: 20,
        backgroundColor: '#dddddd'
    },
    groupContactNameContainer:{
        margin: 20,
    },
    groupContactSearchContainer:{
        margin: 20,
    },
    underline:{
        borderBottomWidth: 1.5,
        borderColor: '#333',
        margin: 10,
        flex: 1,
    }
});