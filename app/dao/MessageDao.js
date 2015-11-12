import DBHelper from './DBHelper';
import * as AppConstants from '../constants/AppConstants';

class MessageDao{

     async addMessage(threadId, newMessage){
        let messageId;
        let currentTime = new Date().getTime();
        let messageForDB = newMessage.getMessageForDBSave();
        messageForDB.timestamp = currentTime;
        let sqlStmt = 'INSERT into Message (threadId, senderId, receiverId, status, mediaStatus, isGroupThread, message,' +
            'direction, thumbImageUrl, mediaUrl, mediaMimeType, mediaDesc, latitude, longitude, type, ttl, isOwner,' +
            'timestamp, needsPush, extras) values' +
            '(:threadId, :senderId, :receiverId, :status, :mediaStatus, :isGroupThread, :message,' +
            ':direction, :thumbImageUrl, :mediaUrl, :mediaMimeType, :mediaDesc, :latitude, :longitude, :type, :ttl, :isOwner,' +
            ':timestamp, :needsPush, :extras)';
        try{
            messageId = await DBHelper.executeInsert(AppConstants.MESSAGES_DB, sqlStmt, messageForDB);
        }catch(err){
            console.log("Error saving message to DB "+ err);
        }
        this.addMessageRemoteId(messageId, newMessage.uid);
        return messageId;
    }

    async getMessages(threadId){
        let threadMessages = [];
        let sqlStmt = 'SELECT * from Message where threadId = :threadId order by timestamp';
        let paramMap = {threadId: threadId};
        try{
            threadMessages = await DBHelper.executeQuery(AppConstants.MESSAGES_DB, sqlStmt, paramMap);
            debugAsyncObject(threadMessages);
        }catch(err){
            console.log("Get message query threw error "+err);
        }
        return threadMessages;
    }

    async getGroupMessages(threadId){
        let threadMessages = [];
        let sqlStmt = 'SELECT * from GroupMessage where threadId = :threadId';
        let paramMap = {threadId: threadId};
        try{
            threadMessages = await DBHelper.executeQuery(AppConstants.MESSAGES_DB, sqlStmt, paramMap);
            debugAsyncObject(threadMessages);
        }catch(err){
            console.log("Get group message query threw error "+err);
        }
        return threadMessages;
    }

    addMessageRemoteId(messageId, uuid){
        let sqlStmt = 'INSERT into MessageRemoteID (uid, messageId) values (:uid, :messageId)';
        let paramMap = {uid: uuid, messageId: messageId};
        let addRemoteMessagePromise = DBHelper.executeInsert(AppConstants.MESSAGES_DB, sqlStmt, paramMap);
        return addRemoteMessagePromise;
    }

    updateUploadStatus(message, status){
        let currentTime = new Date().getTime();
        let sqlStmt = 'UPDATE Message set mediaStatus = :mediaStatus, timestamp = :timestamp where id = :messageId';
        let paramMap = {messageId: message.id, mediaStatus: status, timestamp: currentTime};
        let updateMediaStatusPromise = DBHelper.executeUpdate(AppConstants.MESSAGES_DB, sqlStmt, paramMap);
        return updateMediaStatusPromise;
    }

    updateMessageStatus(message, status){
        let currentTime = new Date().getTime();
        let sqlStmt = 'UPDATE Message set status = :status, timestamp = :timestamp where id = :messageId';
        let paramMap = {messageId: message.id, status: status, timestamp: currentTime};
        let updateMessageStatusPromise = DBHelper.executeUpdate(AppConstants.MESSAGES_DB, sqlStmt, paramMap);
        return updateMessageStatusPromise;
    }

}

export default new MessageDao();