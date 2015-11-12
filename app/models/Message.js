import * as MessageConstants from '../constants/MessageConstants.js';
import * as _ from 'lodash';
import uuid from '../utils/uuid';

export default class Message{
    constructor(text, threadId) {
        this.id                     = undefined;
        this.uid                    = uuid.v4();
        this.threadId               = threadId;
        this.senderId               = '';
        this.receiverId             = '';
        this.isGroupThread          = false;
        this.message                = text;
        this.thumbImageUrl          = '';
        this.mediaUrl               = '';  //this is the local url of stored media
        this.remoteName             = '';
        this.mediaMimeType          = 'image/jpeg';
        this.mediaDesc              = '';
        this.latitude               = '';
        this.longitude              = '';
        this.type                   = MessageConstants.PLAIN_TEXT;
        this.ttl                    = 0;
        this.extras                 = '';

        //internal use fields
        this.selected               = false;
        this.status                 = MessageConstants.STATUS_PENDING;
        this.mediaStatus            = MessageConstants.PENDING_UPLOAD;
        this.isOwner                = true;
        this.displayName            = ''; //internal use for group chat. will be derived from contacts table.
        this.timestamp              = 0;
        this.direction              = 0; //sent or received
        this.needsPush              = true; //indicates pending/draft message
    }

    getMessageForTransport(){
        let transportMessage           =  _.clone(this);
        transportMessage.sequenceId    = undefined;

        //thread Id needs to be sent only for group chats. For private chats
        if(!this.isGroupThread){
            transportMessage.threadId  = undefined;
        }
        transportMessage.selected      = undefined;
        transportMessage.status        = undefined;
        transportMessage.owner         = undefined;
        transportMessage.direction     = undefined;
        transportMessage.needsPush     = undefined;
        return transportMessage;
    }

    getMessageForDBSave(){
        let messageForDB         = _.clone(this);
        messageForDB.selected    = undefined;
        messageForDB.uid         = undefined;
        messageForDB.displayName = undefined;
        return messageForDB;
    }
}

