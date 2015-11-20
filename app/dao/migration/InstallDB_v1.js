import DBHelper from '../DBHelper';
import * as AppConstants from '../../constants/AppConstants';

class InstallDB_v1{

    apply(){
        let createContactsTable = 'CREATE TABLE if not exists Contact '+
                                        '(phoneNumber           text     primary key, ' +
                                        'firstName              text,'+
                                        'lastName               text,'+
                                        'email                  text,'+
                                        'displayName            text,'+
                                        'remoteName             text,'+
                                        'phoneType              text,'+
                                        'phoneLabel             text,'+
                                        'localContactIdLink     text,'+
                                        'abRecordIdLink         text,'+
                                        'androidLookupKey       text,'+
                                        'isRegisteredUser       integer,'+
                                        'status                 integer,'+
                                        'photo                  text,'+
                                        'thumbNailPhoto         text,'+
                                        'lastSeenTime           integer,'+
                                        'extras                 text,'+
                                        'lastModifiedTime       integer)';

        let threadTable       =  'CREATE TABLE if not exists Thread '+
                                            '(id                    integer primary key autoincrement,' +
                                            'recipientPhoneNumber   text,'+
                                            'displayName            text,'+
                                            'isGroupThread          integer,'+
                                            'groupUid               text    unique,'+
                                            'direction              integer,'+
                                            'count                  integer,'+
                                            'unreadCount            integer,'+
                                            'photo                  text,'+
                                            'thumbNailPhoto         text,'+
                                            'mimeType               text,'+
                                            'lastMessageText        text,'+
                                            'lastMessageTime        integer,'+
                                            'isMuted                integer,'+
                                            'extras                 text,'+
                                            'lastModifiedTime       integer)';

        let messageTable       =  'CREATE TABLE if not exists Message'+
                                            '(id                    integer primary key autoincrement,'+
                                            'threadId               integer,'+
                                            'senderId               text,'+
                                            'receiverId             text,'+
                                            'remoteName             text,'+ //used in group chat, sent from server
                                            'status                 integer,'+
                                            'mediaStatus            integer,'+
                                            'isGroupThread          integer,'+
                                            'message                text,'+
                                            'direction              integer,'+
                                            'thumbImageUrl          text,'+
                                            'mediaUrl               text,'+
                                            'mediaMimeType          text,'+
                                            'mediaDesc              text,'+
                                            'latitude               text,'+
                                            'longitude              text,'+
                                            'type                   integer,'+
                                            'ttl                    integer,'+
                                            'isOwner                integer,'+
                                            'timestamp              integer,'+
                                            'needsPush              integer,'+
                                            'extras                 text)';

        let messageRemoteIdTable = 'CREATE TABLE if not exists MessageRemoteID' +
                                            '(uid                   text primary key,' +
                                            'messageId              integer unique)';

        let preferenceTable      = 'CREATE TABLE if not exists Preferences'+
                                            '(key         text  unique,'+
                                            'value        text       )';

        let groupMessageView    = 'CREATE VIEW IF NOT EXISTS  GroupMessage AS '+
                                    'SELECT M.*, C.displayName as displayName from Message M, Contact C '+
                                    'ON M.senderId = C.phoneNumber order by M.timestamp';
        /*let groupInfoTable     =  'CREATE TABLE GroupInfo id integer primary key autoincrement, groupUid text unique,'+
         'name text, threadId integer, photoUrl text, members text,'+
         'ownerId text, lastMessageOwner text, state text,'+
         'extras text, lastModifiedTime integer';

         let groupMemberTable  =  'CREATE TABLE GroupMember id integer primary key, groupUid text unique,'+
         'firstName text, lastName text, email text, displayName text,'+
         'remoteName text, status text, photoUrl text, lastSeenTime integer,'+
         'extras text, lastModifiedTime integer';*/

        let threadPhoneNumberIndex = 'CREATE INDEX IF NOT EXISTS Thread_Phone_Number_idx ON Thread (recipientPhoneNumber)';
        let threadGroupIdIndex     = 'CREATE INDEX IF NOT EXISTS Thread_Group_ID_idx ON Thread (groupUid)';

        let promise1 = DBHelper.executeUpdate(AppConstants.MESSAGES_DB, createContactsTable);
        let promise2 = DBHelper.executeUpdate(AppConstants.MESSAGES_DB, preferenceTable);
        let promise3 = DBHelper.executeUpdate(AppConstants.MESSAGES_DB, threadTable);
        let promise4 = DBHelper.executeUpdate(AppConstants.MESSAGES_DB, messageTable);
        let promise5 = DBHelper.executeUpdate(AppConstants.MESSAGES_DB, messageRemoteIdTable);
        let promise6 = DBHelper.executeUpdate(AppConstants.MESSAGES_DB, threadPhoneNumberIndex);
        let promise7 = DBHelper.executeUpdate(AppConstants.MESSAGES_DB, threadGroupIdIndex);
        let promise8 = DBHelper.executeUpdate(AppConstants.MESSAGES_DB, groupMessageView);

        return Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8]);
    }
}
export default new InstallDB_v1();