var parcelRequire = function (e, r, t, n) {
  var i, o = "function" == typeof parcelRequire && parcelRequire,
    u = "function" == typeof require && require;

  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw c.code = "MODULE_NOT_FOUND", c
      }
      p.resolve = function (r) {
        return e[t][1][r] || r
      }, p.cache = {};
      var l = r[t] = new f.Module(t);
      e[t][0].call(l.exports, p, l, l.exports, this)
    }
    return r[t].exports;

    function p(e) {
      return f(p.resolve(e))
    }
  }
  f.isParcelRequire = !0, f.Module = function (e) {
    this.id = e, this.bundle = f, this.exports = {}
  }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
    e[r] = [function (e, r) {
      r.exports = t
    }, {}]
  };
  for (var c = 0; c < t.length; c++) try {
    f(t[c])
  } catch (e) {
    i || (i = e)
  }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
      return l
    }) : n && (this[n] = l)
  }
  if (parcelRequire = f, i) throw i;
  return f
}({
  "G7Dp": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = function () {
        return {
          nested: {
            easemob: {
              nested: {
                pb: {
                  nested: {
                    MessageBody: {
                      fields: {
                        type: {
                          type: "Type",
                          id: 1
                        },
                        from: {
                          type: "JID",
                          id: 2
                        },
                        to: {
                          type: "JID",
                          id: 3
                        },
                        contents: {
                          rule: "repeated",
                          type: "Content",
                          id: 4
                        },
                        ext: {
                          rule: "repeated",
                          type: "KeyValue",
                          id: 5
                        },
                        ackMessageId: {
                          type: "uint64",
                          id: 6
                        },
                        msgConfig: {
                          type: "MessageConfig",
                          id: 7
                        },
                        ackContent: {
                          type: "string",
                          id: 8
                        }
                      },
                      nested: {
                        Content: {
                          fields: {
                            type: {
                              type: "Type",
                              id: 1
                            },
                            text: {
                              type: "string",
                              id: 2
                            },
                            latitude: {
                              type: "double",
                              id: 3
                            },
                            longitude: {
                              type: "double",
                              id: 4
                            },
                            address: {
                              type: "string",
                              id: 5
                            },
                            displayName: {
                              type: "string",
                              id: 6
                            },
                            remotePath: {
                              type: "string",
                              id: 7
                            },
                            secretKey: {
                              type: "string",
                              id: 8
                            },
                            fileLength: {
                              type: "int32",
                              id: 9
                            },
                            action: {
                              type: "string",
                              id: 10
                            },
                            params: {
                              rule: "repeated",
                              type: "KeyValue",
                              id: 11
                            },
                            duration: {
                              type: "int32",
                              id: 12
                            },
                            size: {
                              type: "Size",
                              id: 13
                            },
                            thumbnailRemotePath: {
                              type: "string",
                              id: 14
                            },
                            thumbnailSecretKey: {
                              type: "string",
                              id: 15
                            },
                            thumbnailDisplayName: {
                              type: "string",
                              id: 16
                            },
                            thumbnailFileLength: {
                              type: "int32",
                              id: 17
                            },
                            thumbnailSize: {
                              type: "Size",
                              id: 18
                            },
                            customEvent: {
                              type: "string",
                              id: 19
                            },
                            customExts: {
                              rule: "repeated",
                              type: "KeyValue",
                              id: 20
                            }
                          },
                          nested: {
                            Type: {
                              values: {
                                TEXT: 0,
                                IMAGE: 1,
                                VIDEO: 2,
                                LOCATION: 3,
                                VOICE: 4,
                                FILE: 5,
                                COMMAND: 6,
                                CUSTOM: 7
                              }
                            },
                            Size: {
                              fields: {
                                width: {
                                  type: "double",
                                  id: 1
                                },
                                height: {
                                  type: "double",
                                  id: 2
                                }
                              }
                            }
                          }
                        },
                        Type: {
                          values: {
                            NORMAL: 0,
                            CHAT: 1,
                            GROUPCHAT: 2,
                            CHATROOM: 3,
                            READ_ACK: 4,
                            DELIVER_ACK: 5,
                            RECALL: 6
                          }
                        },
                        MessageConfig: {
                          fields: {
                            allowGroupAck: {
                              type: "bool",
                              id: 1
                            }
                          }
                        }
                      }
                    },
                    KeyValue: {
                      oneofs: {
                        value: {
                          oneof: ["varintValue", "floatValue", "doubleValue", "stringValue"]
                        }
                      },
                      fields: {
                        key: {
                          type: "string",
                          id: 1
                        },
                        type: {
                          type: "ValueType",
                          id: 2
                        },
                        varintValue: {
                          type: "int64",
                          id: 3
                        },
                        floatValue: {
                          type: "float",
                          id: 4
                        },
                        doubleValue: {
                          type: "double",
                          id: 5
                        },
                        stringValue: {
                          type: "string",
                          id: 6
                        }
                      },
                      nested: {
                        ValueType: {
                          values: {
                            BOOL: 1,
                            INT: 2,
                            UINT: 3,
                            LLINT: 4,
                            FLOAT: 5,
                            DOUBLE: 6,
                            STRING: 7,
                            JSON_STRING: 8
                          }
                        }
                      }
                    },
                    JID: {
                      fields: {
                        appKey: {
                          type: "string",
                          id: 1
                        },
                        name: {
                          type: "string",
                          id: 2
                        },
                        domain: {
                          type: "string",
                          id: 3
                        },
                        clientResource: {
                          type: "string",
                          id: 4
                        }
                      }
                    },
                    ConferenceBody: {
                      fields: {
                        sessionId: {
                          type: "string",
                          id: 1
                        },
                        operation: {
                          type: "Operation",
                          id: 2
                        },
                        conferenceId: {
                          type: "string",
                          id: 3
                        },
                        type: {
                          type: "Type",
                          id: 4
                        },
                        content: {
                          type: "string",
                          id: 5
                        },
                        network: {
                          type: "string",
                          id: 6
                        },
                        version: {
                          type: "string",
                          id: 7
                        },
                        identity: {
                          type: "Identity",
                          id: 8
                        },
                        duration: {
                          type: "string",
                          id: 9
                        },
                        peerName: {
                          type: "string",
                          id: 10
                        },
                        endReason: {
                          type: "EndReason",
                          id: 11
                        },
                        status: {
                          type: "Status",
                          id: 12
                        },
                        isDirect: {
                          type: "bool",
                          id: 13
                        },
                        controlType: {
                          type: "StreamControlType",
                          id: 14
                        },
                        routeFlag: {
                          type: "int32",
                          id: 15
                        },
                        routeKey: {
                          type: "string",
                          id: 16
                        }
                      },
                      nested: {
                        Status: {
                          fields: {
                            errorCode: {
                              type: "int32",
                              id: 1
                            }
                          }
                        },
                        Operation: {
                          values: {
                            JOIN: 0,
                            INITIATE: 1,
                            ACCEPT_INITIATE: 2,
                            ANSWER: 3,
                            TERMINATE: 4,
                            REMOVE: 5,
                            STREAM_CONTROL: 6,
                            MEDIA_REQUEST: 7
                          }
                        },
                        Type: {
                          values: {
                            VOICE: 0,
                            VIDEO: 1
                          }
                        },
                        Identity: {
                          values: {
                            CALLER: 0,
                            CALLEE: 1
                          }
                        },
                        EndReason: {
                          values: {
                            HANGUP: 0,
                            NORESPONSE: 1,
                            REJECT: 2,
                            BUSY: 3,
                            FAIL: 4,
                            UNSUPPORTED: 5,
                            OFFLINE: 6
                          }
                        },
                        StreamControlType: {
                          values: {
                            PAUSE_VOICE: 0,
                            RESUME_VOICE: 1,
                            PAUSE_VIDEO: 2,
                            RESUME_VIDEO: 3
                          }
                        }
                      }
                    },
                    MSync: {
                      fields: {
                        version: {
                          type: "Version",
                          id: 1,
                          options: {
                            default: "MSYNC_V1"
                          }
                        },
                        guid: {
                          type: "JID",
                          id: 2
                        },
                        auth: {
                          type: "string",
                          id: 3
                        },
                        compressAlgorimth: {
                          type: "uint32",
                          id: 4
                        },
                        crypto: {
                          type: "uint32",
                          id: 5
                        },
                        userAgent: {
                          type: "string",
                          id: 6
                        },
                        pov: {
                          type: "uint64",
                          id: 7
                        },
                        command: {
                          type: "Command",
                          id: 8
                        },
                        deviceId: {
                          type: "uint32",
                          id: 10
                        },
                        encryptType: {
                          rule: "repeated",
                          type: "EncryptType",
                          id: 11,
                          options: {
                            packed: !1
                          }
                        },
                        encryptKey: {
                          type: "string",
                          id: 12
                        },
                        payload: {
                          type: "bytes",
                          id: 9
                        }
                      },
                      nested: {
                        Version: {
                          values: {
                            MSYNC_V1: 0,
                            MSYNC_V2: 1
                          }
                        },
                        Command: {
                          values: {
                            SYNC: 0,
                            UNREAD: 1,
                            NOTICE: 2,
                            PROVISION: 3
                          }
                        }
                      }
                    },
                    EncryptType: {
                      values: {
                        ENCRYPT_NONE: 0,
                        ENCRYPT_AES_128_CBC: 1,
                        ENCRYPT_AES_256_CBC: 2
                      }
                    },
                    CommSyncUL: {
                      fields: {
                        meta: {
                          type: "Meta",
                          id: 1
                        },
                        key: {
                          type: "uint64",
                          id: 2
                        },
                        queue: {
                          type: "JID",
                          id: 3
                        },
                        isRoam: {
                          type: "bool",
                          id: 4
                        },
                        lastFullRoamKey: {
                          type: "uint64",
                          id: 5
                        }
                      }
                    },
                    CommSyncDL: {
                      fields: {
                        status: {
                          type: "Status",
                          id: 1
                        },
                        metaId: {
                          type: "uint64",
                          id: 2
                        },
                        serverId: {
                          type: "uint64",
                          id: 3
                        },
                        metas: {
                          rule: "repeated",
                          type: "Meta",
                          id: 4
                        },
                        nextKey: {
                          type: "uint64",
                          id: 5
                        },
                        queue: {
                          type: "JID",
                          id: 6
                        },
                        isLast: {
                          type: "bool",
                          id: 7
                        },
                        timestamp: {
                          type: "uint64",
                          id: 8
                        },
                        isRoam: {
                          type: "bool",
                          id: 9
                        }
                      }
                    },
                    CommNotice: {
                      fields: {
                        queue: {
                          type: "JID",
                          id: 1
                        }
                      }
                    },
                    CommUnreadUL: {
                      fields: {}
                    },
                    CommUnreadDL: {
                      fields: {
                        status: {
                          type: "Status",
                          id: 1
                        },
                        unread: {
                          rule: "repeated",
                          type: "MetaQueue",
                          id: 2
                        },
                        timestamp: {
                          type: "uint64",
                          id: 3
                        }
                      }
                    },
                    MetaQueue: {
                      fields: {
                        queue: {
                          type: "JID",
                          id: 1
                        },
                        n: {
                          type: "uint32",
                          id: 2
                        }
                      }
                    },
                    Meta: {
                      fields: {
                        id: {
                          type: "uint64",
                          id: 1
                        },
                        from: {
                          type: "JID",
                          id: 2
                        },
                        to: {
                          type: "JID",
                          id: 3
                        },
                        timestamp: {
                          type: "uint64",
                          id: 4
                        },
                        ns: {
                          type: "NameSpace",
                          id: 5
                        },
                        payload: {
                          type: "bytes",
                          id: 6
                        },
                        routetype: {
                          type: "RouteType",
                          id: 7
                        }
                      },
                      nested: {
                        NameSpace: {
                          values: {
                            STATISTIC: 0,
                            CHAT: 1,
                            MUC: 2,
                            ROSTER: 3,
                            CONFERENCE: 4
                          }
                        },
                        RouteType: {
                          values: {
                            ROUTE_ALL: 0,
                            ROUTE_ONLINE: 1
                          }
                        }
                      }
                    },
                    Status: {
                      fields: {
                        errorCode: {
                          type: "ErrorCode",
                          id: 1
                        },
                        reason: {
                          type: "string",
                          id: 2
                        },
                        redirectInfo: {
                          rule: "repeated",
                          type: "RedirectInfo",
                          id: 3
                        }
                      },
                      nested: {
                        ErrorCode: {
                          values: {
                            OK: 0,
                            FAIL: 1,
                            UNAUTHORIZED: 2,
                            MISSING_PARAMETER: 3,
                            WRONG_PARAMETER: 4,
                            REDIRECT: 5,
                            TOKEN_EXPIRED: 6,
                            PERMISSION_DENIED: 7,
                            NO_ROUTE: 8,
                            UNKNOWN_COMMAND: 9,
                            PB_PARSER_ERROR: 10,
                            BIND_ANOTHER_DEVICE: 11,
                            IM_FORBIDDEN: 12,
                            TOO_MANY_DEVICES: 13,
                            PLATFORM_LIMIT: 14,
                            USER_MUTED: 15,
                            ENCRYPT_DISABLE: 16,
                            ENCRYPT_ENABLE: 17,
                            DECRYPT_FAILURE: 18
                          }
                        }
                      }
                    },
                    RedirectInfo: {
                      fields: {
                        host: {
                          type: "string",
                          id: 1
                        },
                        port: {
                          type: "uint32",
                          id: 2
                        }
                      }
                    },
                    Provision: {
                      fields: {
                        osType: {
                          type: "OsType",
                          id: 1
                        },
                        version: {
                          type: "string",
                          id: 2
                        },
                        networkType: {
                          type: "NetworkType",
                          id: 3
                        },
                        appSign: {
                          type: "string",
                          id: 4
                        },
                        compressType: {
                          rule: "repeated",
                          type: "CompressType",
                          id: 5,
                          options: {
                            packed: !1
                          }
                        },
                        encryptType: {
                          rule: "repeated",
                          type: "EncryptType",
                          id: 6,
                          options: {
                            packed: !1
                          }
                        },
                        encryptKey: {
                          type: "string",
                          id: 7
                        },
                        status: {
                          type: "Status",
                          id: 8
                        },
                        deviceUuid: {
                          type: "string",
                          id: 9
                        },
                        isManualLogin: {
                          type: "bool",
                          id: 10
                        },
                        password: {
                          type: "string",
                          id: 11
                        },
                        deviceName: {
                          type: "string",
                          id: 12
                        },
                        resource: {
                          type: "string",
                          id: 13
                        },
                        auth: {
                          type: "string",
                          id: 14
                        }
                      },
                      nested: {
                        OsType: {
                          values: {
                            OS_IOS: 0,
                            OS_ANDROID: 1,
                            OS_LINUX: 2,
                            OS_OSX: 3,
                            OS_WIN: 4,
                            OS_OTHER: 16
                          }
                        },
                        NetworkType: {
                          values: {
                            NETWORK_NONE: 0,
                            NETWORK_WIFI: 1,
                            NETWORK_4G: 2,
                            NETWORK_3G: 3,
                            NETWORK_2G: 4,
                            NETWORK_WIRE: 5
                          }
                        },
                        CompressType: {
                          values: {
                            COMPRESS_NONE: 0,
                            COMPRESS_ZLIB: 1
                          }
                        }
                      }
                    },
                    MUCBody: {
                      fields: {
                        mucId: {
                          type: "JID",
                          id: 1
                        },
                        operation: {
                          type: "Operation",
                          id: 2
                        },
                        from: {
                          type: "JID",
                          id: 3
                        },
                        to: {
                          rule: "repeated",
                          type: "JID",
                          id: 4
                        },
                        setting: {
                          type: "Setting",
                          id: 5
                        },
                        reason: {
                          type: "string",
                          id: 6
                        },
                        isChatroom: {
                          type: "bool",
                          id: 7
                        },
                        status: {
                          type: "Status",
                          id: 8
                        }
                      },
                      nested: {
                        Operation: {
                          values: {
                            CREATE: 0,
                            DESTROY: 1,
                            JOIN: 2,
                            LEAVE: 3,
                            APPLY: 4,
                            APPLY_ACCEPT: 5,
                            APPLY_DECLINE: 6,
                            INVITE: 7,
                            INVITE_ACCEPT: 8,
                            INVITE_DECLINE: 9,
                            KICK: 10,
                            GET_BLACKLIST: 11,
                            BAN: 12,
                            ALLOW: 13,
                            UPDATE: 14,
                            BLOCK: 15,
                            UNBLOCK: 16,
                            PRESENCE: 17,
                            ABSENCE: 18,
                            DIRECT_JOINED: 19,
                            ASSIGN_OWNER: 20,
                            ADD_ADMIN: 21,
                            REMOVE_ADMIN: 22,
                            ADD_MUTE: 23,
                            REMOVE_MUTE: 24,
                            UPDATE_ANNOUNCEMENT: 25,
                            DELETE_ANNOUNCEMENT: 26,
                            UPLOAD_FILE: 27,
                            DELETE_FILE: 28,
                            ADD_USER_WHITE_LIST: 29,
                            REMOVE_USER_WHITE_LIST: 30,
                            BAN_GROUP: 31,
                            REMOVE_BAN_GROUP: 32
                          }
                        },
                        Setting: {
                          fields: {
                            name: {
                              type: "string",
                              id: 1
                            },
                            desc: {
                              type: "string",
                              id: 2
                            },
                            type: {
                              type: "Type",
                              id: 3
                            },
                            maxUsers: {
                              type: "int32",
                              id: 4
                            },
                            owner: {
                              type: "string",
                              id: 5
                            }
                          },
                          nested: {
                            Type: {
                              values: {
                                PRIVATE_OWNER_INVITE: 0,
                                PRIVATE_MEMBER_INVITE: 1,
                                PUBLIC_JOIN_APPROVAL: 2,
                                PUBLIC_JOIN_OPEN: 3,
                                PUBLIC_ANONYMOUS: 4
                              }
                            }
                          }
                        },
                        Status: {
                          fields: {
                            errorCode: {
                              type: "ErrorCode",
                              id: 1
                            },
                            description: {
                              type: "string",
                              id: 2
                            }
                          },
                          nested: {
                            ErrorCode: {
                              values: {
                                OK: 0,
                                PERMISSION_DENIED: 1,
                                WRONG_PARAMETER: 2,
                                MUC_NOT_EXIST: 3,
                                USER_NOT_EXIST: 4,
                                UNKNOWN: 5
                              }
                            }
                          }
                        }
                      }
                    },
                    RosterBody: {
                      fields: {
                        operation: {
                          type: "Operation",
                          id: 1
                        },
                        status: {
                          type: "Status",
                          id: 2
                        },
                        from: {
                          type: "JID",
                          id: 3
                        },
                        to: {
                          rule: "repeated",
                          type: "JID",
                          id: 4
                        },
                        reason: {
                          type: "string",
                          id: 5
                        },
                        rosterVer: {
                          type: "string",
                          id: 6
                        },
                        biDirection: {
                          type: "bool",
                          id: 7
                        }
                      },
                      nested: {
                        Operation: {
                          values: {
                            GET_ROSTER: 0,
                            GET_BLACKLIST: 1,
                            ADD: 2,
                            REMOVE: 3,
                            ACCEPT: 4,
                            DECLINE: 5,
                            BAN: 6,
                            ALLOW: 7,
                            REMOTE_ACCEPT: 8,
                            REMOTE_DECLINE: 9
                          }
                        },
                        Status: {
                          fields: {
                            errorCode: {
                              type: "ErrorCode",
                              id: 1
                            },
                            description: {
                              type: "string",
                              id: 2
                            }
                          },
                          nested: {
                            ErrorCode: {
                              values: {
                                OK: 0,
                                USER_NOT_EXIST: 1,
                                USER_ALREADY_FRIEND: 2,
                                USER_ALREADY_BLACKLIST: 3
                              }
                            }
                          }
                        }
                      }
                    },
                    StatisticsBody: {
                      fields: {
                        operation: {
                          type: "Operation",
                          id: 1
                        },
                        os: {
                          type: "OsType",
                          id: 2
                        },
                        version: {
                          type: "string",
                          id: 3
                        },
                        network: {
                          type: "NetworkType",
                          id: 4
                        },
                        imTime: {
                          type: "uint32",
                          id: 5
                        },
                        chatTime: {
                          type: "uint32",
                          id: 6
                        },
                        location: {
                          type: "string",
                          id: 7
                        }
                      },
                      nested: {
                        Operation: {
                          values: {
                            INFORMATION: 0,
                            USER_REMOVED: 1,
                            USER_LOGIN_ANOTHER_DEVICE: 2,
                            USER_KICKED_BY_CHANGE_PASSWORD: 3,
                            USER_KICKED_BY_OTHER_DEVICE: 4
                          }
                        },
                        OsType: {
                          values: {
                            OS_IOS: 0,
                            OS_ANDROID: 1,
                            OS_LINUX: 2,
                            OS_OSX: 3,
                            OS_WIN: 4,
                            OS_OTHER: 16
                          }
                        },
                        NetworkType: {
                          values: {
                            NETWORK_NONE: 0,
                            NETWORK_WIFI: 1,
                            NETWORK_4G: 2,
                            NETWORK_3G: 3,
                            NETWORK_2G: 4,
                            NETWORK_WIRE: 5
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      t = e;
    exports.default = t;
  }, {}],
  "KLYY": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var E = function () {
        return {
          WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR: 0,
          WEBIM_CONNCTION_OPEN_ERROR: 1,
          WEBIM_CONNCTION_AUTH_ERROR: 2,
          WEBIM_CONNCTION_OPEN_USERGRID_ERROR: 3,
          WEBIM_CONNCTION_ATTACH_ERROR: 4,
          WEBIM_CONNCTION_ATTACH_USERGRID_ERROR: 5,
          WEBIM_CONNCTION_REOPEN_ERROR: 6,
          WEBIM_CONNCTION_SERVER_CLOSE_ERROR: 7,
          WEBIM_CONNCTION_SERVER_ERROR: 8,
          WEBIM_CONNCTION_IQ_ERROR: 9,
          WEBIM_CONNCTION_USER_REMOVED: 207,
          WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE: 206,
          WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD: 216,
          WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE: 217,
          WEBIM_CONNCTION_PING_ERROR: 10,
          WEBIM_CONNCTION_NOTIFYVERSION_ERROR: 11,
          WEBIM_CONNCTION_GETROSTER_ERROR: 12,
          WEBIM_CONNCTION_CROSSDOMAIN_ERROR: 13,
          WEBIM_CONNCTION_LISTENING_OUTOF_MAXRETRIES: 14,
          WEBIM_CONNCTION_RECEIVEMSG_CONTENTERROR: 15,
          WEBIM_CONNCTION_DISCONNECTED: 16,
          WEBIM_CONNCTION_AJAX_ERROR: 17,
          WEBIM_CONNCTION_JOINROOM_ERROR: 18,
          WEBIM_CONNCTION_GETROOM_ERROR: 19,
          WEBIM_CONNCTION_GETROOMINFO_ERROR: 20,
          WEBIM_CONNCTION_GETROOMMEMBER_ERROR: 21,
          WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR: 22,
          WEBIM_CONNCTION_LOAD_CHATROOM_ERROR: 23,
          WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR: 24,
          WEBIM_CONNCTION_JOINCHATROOM_ERROR: 25,
          WEBIM_CONNCTION_QUITCHATROOM_ERROR: 26,
          WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR: 27,
          WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR: 28,
          WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR: 29,
          WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR: 30,
          WEBIM_CONNCTION_CALLBACK_INNER_ERROR: 31,
          WEBIM_CONNCTION_CLIENT_OFFLINE: 32,
          WEBIM_CONNCTION_CLIENT_LOGOUT: 33,
          WEBIM_CONNCTION_CLIENT_TOO_MUCH_ERROR: 34,
          WEBIM_CONNECTION_ACCEPT_INVITATION_FROM_GROUP: 35,
          WEBIM_CONNECTION_DECLINE_INVITATION_FROM_GROUP: 36,
          WEBIM_CONNECTION_ACCEPT_JOIN_GROUP: 37,
          WEBIM_CONNECTION_DECLINE_JOIN_GROUP: 38,
          WEBIM_CONNECTION_CLOSED: 39,
          WEBIM_UPLOADFILE_BROWSER_ERROR: 100,
          WEBIM_UPLOADFILE_ERROR: 101,
          WEBIM_UPLOADFILE_NO_LOGIN: 102,
          WEBIM_UPLOADFILE_NO_FILE: 103,
          WEBIM_DOWNLOADFILE_ERROR: 200,
          WEBIM_DOWNLOADFILE_NO_LOGIN: 201,
          WEBIM_DOWNLOADFILE_BROWSER_ERROR: 202,
          WEBIM_MESSAGE_REC_TEXT: 300,
          WEBIM_MESSAGE_REC_TEXT_ERROR: 301,
          WEBIM_MESSAGE_REC_EMOTION: 302,
          WEBIM_MESSAGE_REC_PHOTO: 303,
          WEBIM_MESSAGE_REC_AUDIO: 304,
          WEBIM_MESSAGE_REC_AUDIO_FILE: 305,
          WEBIM_MESSAGE_REC_VEDIO: 306,
          WEBIM_MESSAGE_REC_VEDIO_FILE: 307,
          WEBIM_MESSAGE_REC_FILE: 308,
          WEBIM_MESSAGE_SED_TEXT: 309,
          WEBIM_MESSAGE_SED_EMOTION: 310,
          WEBIM_MESSAGE_SED_PHOTO: 311,
          WEBIM_MESSAGE_SED_AUDIO: 312,
          WEBIM_MESSAGE_SED_AUDIO_FILE: 313,
          WEBIM_MESSAGE_SED_VEDIO: 314,
          WEBIM_MESSAGE_SED_VEDIO_FILE: 315,
          WEBIM_MESSAGE_SED_FILE: 316,
          WEBIM_MESSAGE_SED_ERROR: 317,
          STATUS_INIT: 400,
          STATUS_DOLOGIN_USERGRID: 401,
          STATUS_DOLOGIN_IM: 402,
          STATUS_OPENED: 403,
          STATUS_CLOSING: 404,
          STATUS_CLOSED: 405,
          STATUS_ERROR: 406,
          GROUP_NOT_EXIST: 605,
          GROUP_NOT_JOINED: 602,
          MESSAGE_RECALL_TIME_LIMIT: 504,
          SERVICE_NOT_ENABLED: 505,
          SERVICE_NOT_ALLOW_MESSAGING: 506,
          SERVER_UNKNOWN_ERROR: 503,
          MESSAGE_INCLUDE_ILLEGAL_CONTENT: 501,
          PERMISSION_DENIED: 603,
          WEBIM_LOAD_MSG_ERROR: 604
        }
      },
      _ = E;
    exports.default = _;
  }, {}],
  "PkDd": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var o = !0;
    try {
      o = !window || !navigator
    } catch (l) {
      o = !0
    }
    var e = [{
      key: "Environment",
      value: "production",
      keyBgColor: "#606060",
      valueBgColor: "#1299ec"
    }, {
      key: "version",
      value: "3.1.2",
      keyBgColor: "#606060",
      valueBgColor: "#1299ec"
    }, {
      key: "updateTime",
      value: "2020.5.14",
      keyBgColor: "#606060",
      valueBgColor: "#1299ec"
    }, {
      key: "platform",
      value: o ? "miniProgram" : "browser",
      keyBgColor: "#606060",
      valueBgColor: "#1299ec"
    }];

    function r(o) {
      for (var e = 0, r = o.length; e < r; e++) console.log("%c ".concat(o[e].key, " %c ").concat(o[e].value, " "), "padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: ".concat(o[e].keyBgColor, ";"), "padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ".concat(o[e].valueBgColor, ";"))
    }
    r(e);
    var a = o;
    exports.default = a;
  }, {}],
  "a9jn": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = t(require("../status"));

    function t(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function r(e) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(e)
    }
    var n = (0, e.default)(),
      o = !1,
      a = "undefined" != typeof FormData,
      i = "undefined" != typeof Blob,
      l = !0,
      s = o.overrideMimeType || !1,
      d = l && a,
      p = d || !1,
      u = l && (i || s),
      c = function () {};
    Object.keys || (Object.keys = function () {
      var e = Object.prototype.hasOwnProperty,
        t = !{
          toString: null
        }.propertyIsEnumerable("toString"),
        n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        o = n.length;
      return function (a) {
        if ("object" !== r(a) && ("function" != typeof a || null === a)) throw new TypeError("Object.keys called on non-object");
        var i, l, s = [];
        for (i in a) e.call(a, i) && s.push(i);
        if (t)
          for (l = 0; l < o; l++) e.call(a, n[l]) && s.push(n[l]);
        return s
      }
    }());
    var f = {
        hasFormData: a,
        hasBlob: i,
        emptyfn: c,
        isCanSetRequestHeader: l,
        hasOverrideMimeType: s,
        isCanUploadFileAsync: d,
        isCanUploadFile: p,
        isCanDownLoadFile: u,
        isSupportWss: !0,
        hasFlash: !1,
        xmlrequest: !1,
        stringify: function (e) {
          if ("undefined" != typeof JSON && JSON.stringify) return JSON.stringify(e);
          var t = "",
            n = [];
          return function e(o) {
            var a = !1;
            for (var i in "[object Array]" === Object.prototype.toString.call(o) ? (n.push("]", "["), a = !0) : "[object Object]" === Object.prototype.toString.call(o) && n.push("}", "{"), o) "[object Null]" === Object.prototype.toString.call(o[i]) ? o[i] = "null" : "[object Undefined]" === Object.prototype.toString.call(o[i]) && (o[i] = "undefined"), o[i] && "object" === r(o[i]) ? t += "," + (a ? "" : '"' + i + '":' + (a ? '"' : "")) + e(o[i]) : t += ',"' + (a ? "" : i + '":"') + o[i] + '"';
            return "" != t && (t = t.slice(1)), n.pop() + t + n.pop()
          }(e)
        },
        login: function (e) {
          var t = (e = e || {}).success || c,
            r = e.error || c,
            o = (e.appKey || "").split("#");
          if (2 !== o.length) return r({
            type: n.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
          }), !1;
          var a = o[0],
            i = o[1],
            l = l || e.https,
            s = e.user || "",
            d = e.pwd || "",
            p = e.apiUrl,
            u = {
              grant_type: "password",
              username: s,
              password: d,
              timestamp: +new Date
            };
          e = {
            url: p + "/" + a + "/" + i + "/token",
            dataType: "json",
            data: f.stringify(u),
            success: t,
            error: r
          };
          return f.ajax(e)
        },
        getFileUrl: function (e) {
          var t = {
              url: "",
              filename: "",
              filetype: "",
              data: ""
            },
            r = "string" == typeof e ? document.getElementById(e) : e;
          if (!f.isCanUploadFileAsync || !r) return t;
          try {
            if (window.URL.createObjectURL) {
              var n = r.files;
              if (n.length > 0) {
                var o = n.item(0);
                t.data = o, t.url = window.URL.createObjectURL(o), t.filename = o.name || ""
              }
            } else {
              o = document.getElementById(e).value;
              t.url = o;
              var a = o.lastIndexOf("/"),
                i = o.lastIndexOf("\\"),
                l = Math.max(a, i);
              t.filename = l < 0 ? o : o.substring(l + 1)
            }
            var s = t.filename.lastIndexOf(".");
            return -1 != s && (t.filetype = t.filename.substring(s + 1).toLowerCase()), t
          } catch (d) {
            throw d
          }
        },
        getFileSize: function (e) {
          var t = document.getElementById(e),
            r = 0;
          return t && t.files && t.files.length > 0 && (r = t.files[0].size), r
        },
        trim: function (e) {
          return (e = "string" == typeof e ? e : "").trim ? e.trim() : e.replace(/^\s|\s$/g, "")
        },
        parseLink: function (e) {
          return e = e.replace(/(https?\:\/\/|www\.)([a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+)(\:[0-9]{2,4})?\/?((\.[:_0-9a-zA-Z-]+)|[:_0-9a-zA-Z-]*\/?)*\??[:_#@*&%0-9a-zA-Z-\/=]*/gm, function (e) {
            return "<a href='" + (/^https?/gm.test(e) ? e : "//" + e) + "' target='_blank'>" + e + "</a>"
          })
        },
        parseJSON: function (e) {
          if (window.JSON && window.JSON.parse) return window.JSON.parse(e + "");
          var t, r = null,
            n = f.trim(e + "");
          return n && !f.trim(n.replace(/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g, function (e, n, o, a) {
            return t && n && (r = 0), 0 === r ? e : (t = o || n, r += !a - !o, "")
          })) ? Function("return " + n)() : Function("Invalid JSON: " + e)()
        },
        parseUploadResponse: function (e) {
          return e.indexOf("callback") > -1 ? e.slice(9, -1) : e
        },
        parseDownloadResponse: function (e) {
          return e && e.type && "application/json" === e.type || 0 > Object.prototype.toString.call(e).indexOf("Blob") ? this.url + "?token=" : window.URL.createObjectURL(e)
        },
        uploadFile: function (e) {
          (e = e || {}).onFileUploadProgress = e.onFileUploadProgress || c, e.onFileUploadComplete = e.onFileUploadComplete || c, e.onFileUploadError = e.onFileUploadError || c, e.onFileUploadCanceled = e.onFileUploadCanceled || c;
          var t = e.accessToken || this.context.accessToken;
          if (t) {
            var r, o, a, i = e.appKey || this.context.appKey || "";
            if (i && (r = (a = i.split("#"))[0], o = a[1]), r || o) {
              var l = e.apiUrl;
              this.isHttpDNS && (l = this.apiUrl);
              var s = l + "/" + r + "/" + o + "/chatfiles";
              if (f.isCanUploadFileAsync)
                if ((e.file.data ? e.file.data.size : void 0) <= 0) e.onFileUploadError({
                  type: n.WEBIM_UPLOADFILE_ERROR,
                  id: e.id
                });
                else {
                  var d = f.xmlrequest();
                  d.upload && d.upload.addEventListener("progress", e.onFileUploadProgress, !1), d.addEventListener ? (d.addEventListener("abort", e.onFileUploadCanceled, !1), d.addEventListener("load", function (t) {
                    try {
                      var r = f.parseJSON(d.responseText);
                      try {
                        e.onFileUploadComplete(r)
                      } catch (t) {
                        e.onFileUploadError({
                          type: n.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                          data: t
                        })
                      }
                    } catch (t) {
                      e.onFileUploadError({
                        type: n.WEBIM_UPLOADFILE_ERROR,
                        data: d.responseText,
                        id: e.id,
                        xhr: d
                      })
                    }
                  }, !1), d.addEventListener("error", function (t) {
                    e.onFileUploadError({
                      type: n.WEBIM_UPLOADFILE_ERROR,
                      id: e.id,
                      xhr: d
                    })
                  }, !1)) : d.onreadystatechange && (d.onreadystatechange = function () {
                    if (4 === d.readyState)
                      if (200 === ajax.status) try {
                        var t = f.parseJSON(d.responseText);
                        e.onFileUploadComplete(t)
                      } catch (r) {
                        e.onFileUploadError({
                          type: n.WEBIM_UPLOADFILE_ERROR,
                          data: d.responseText,
                          id: e.id,
                          xhr: d
                        })
                      } else e.onFileUploadError({
                        type: n.WEBIM_UPLOADFILE_ERROR,
                        data: d.responseText,
                        id: e.id,
                        xhr: d
                      });
                      else d.abort(), e.onFileUploadCanceled()
                  }), d.open("POST", s), d.setRequestHeader("restrict-access", "true"), d.setRequestHeader("Accept", "*/*"), d.setRequestHeader("Authorization", "Bearer " + t);
                  var p = new FormData;
                  p.append("file", e.file.data), window.XDomainRequest && (d.readyState = 2), d.send(p)
                }
              else f.hasFlash && "function" == typeof e.flashUpload ? e.flashUpload && e.flashUpload(s, e) : e.onFileUploadError({
                type: n.WEBIM_UPLOADFILE_BROWSER_ERROR,
                id: e.id
              })
            } else e.onFileUploadError({
              type: n.WEBIM_UPLOADFILE_ERROR,
              id: e.id
            })
          } else e.onFileUploadError({
            type: n.WEBIM_UPLOADFILE_NO_LOGIN,
            id: e.id
          })
        },
        download: function (e) {
          e.onFileDownloadComplete = e.onFileDownloadComplete || c, e.onFileDownloadError = e.onFileDownloadError || c;
          var t = e.accessToken || this.context.accessToken,
            r = f.xmlrequest();
          if (t) {
            if (f.isCanDownLoadFile) {
              "addEventListener" in r ? (r.addEventListener("load", function (t) {
                e.onFileDownloadComplete(r.response, r)
              }, !1), r.addEventListener("error", function (t) {
                e.onFileDownloadError({
                  type: n.WEBIM_DOWNLOADFILE_ERROR,
                  id: e.id,
                  xhr: r
                })
              }, !1)) : "onreadystatechange" in r && (r.onreadystatechange = function () {
                4 === r.readyState ? 200 === ajax.status ? e.onFileDownloadComplete(r.response, r) : e.onFileDownloadError({
                  type: n.WEBIM_DOWNLOADFILE_ERROR,
                  id: e.id,
                  xhr: r
                }) : (r.abort(), e.onFileDownloadError({
                  type: n.WEBIM_DOWNLOADFILE_ERROR,
                  id: e.id,
                  xhr: r
                }))
              });
              var o = e.method || "GET",
                a = e.responseType || "blob",
                i = e.mimeType || "text/plain; charset=x-user-defined";
              r.open(o, e.url), "undefined" != typeof Blob ? r.responseType = a : r.overrideMimeType(i);
              var l = {
                  "X-Requested-With": "XMLHttpRequest",
                  Accept: "application/octet-stream",
                  "share-secret": e.secret,
                  Authorization: "Bearer " + t
                },
                s = e.headers || {};
              for (var d in s) l[d] = s[d];
              for (var d in l) l[d] && r.setRequestHeader(d, l[d]);
              window.XDomainRequest && (r.readyState = 2), r.send(null)
            } else e.onFileDownloadComplete()
          } else e.onFileDownloadError({
            type: n.WEBIM_DOWNLOADFILE_NO_LOGIN,
            id: e.id
          })
        },
        parseTextMessage: function (e, t) {
          if ("string" == typeof e) {
            if ("[object Object]" !== Object.prototype.toString.call(t)) return {
              isemoji: !1,
              body: [{
                type: "txt",
                data: e
              }]
            };
            var r = e,
              n = [],
              o = r.match(/\[[^[\]]{2,3}\]/gm);
            if (!o || o.length < 1) return {
              isemoji: !1,
              body: [{
                type: "txt",
                data: e
              }]
            };
            for (var a = !1, i = 0; i < o.length; i++) {
              var l = r.substring(0, r.indexOf(o[i])),
                s = t.map[o[i]];
              if (l && n.push({
                  type: "txt",
                  data: l
                }), s) {
                var d = t.map ? t.path + s : null;
                d ? (a = !0, n.push({
                  type: "emoji",
                  data: d
                })) : n.push({
                  type: "txt",
                  data: o[i]
                });
                var p = r.indexOf(o[i]) + o[i].length;
                r = r.substring(p)
              } else n.push({
                type: "txt",
                data: o[i]
              })
            }
            return r && n.push({
              type: "txt",
              data: r
            }), a ? {
              isemoji: a,
              body: n
            } : {
              isemoji: !1,
              body: [{
                type: "txt",
                data: e
              }]
            }
          }
        },
        ajax: function (e) {
          var t = e.success || c,
            r = e.error || c,
            n = e.type || "POST",
            o = e.data || null,
            a = "";
          if ("get" === n.toLowerCase() && o) {
            for (var i in o) o.hasOwnProperty(i) && (a += i + "=" + o[i] + "&");
            a = a ? a.slice(0, -1) : a, e.url += (e.url.indexOf("?") > 0 ? "&" : "?") + (a ? a + "&" : a) + "_v=" + (new Date).getTime(), o = null, a = null
          }
          wx.request({
            url: e.url,
            data: e.data,
            header: e.headers,
            method: n,
            success: function (e) {
              "200" == e.statusCode ? t(e.data) : r(e)
            },
            complete: function () {},
            fail: function (e) {
              r(e)
            }
          })
        },
        ts: function () {
          var e = new Date,
            t = e.getHours(),
            r = e.getMinutes(),
            n = e.getSeconds();
          return (t < 10 ? "0" + t : t) + ":" + (r < 10 ? "0" + r : r) + ":" + (n < 10 ? "0" + n : n) + ":" + e.getMilliseconds() + " "
        },
        getObjectKey: function (e, t) {
          for (var r in e)
            if (e[r] == t) return r;
          return ""
        },
        sprintf: function () {
          var e, t, r = arguments,
            n = r[0] || "";
          for (e = 1, t = r.length; e < t; e++) n = n.replace(/%s/, r[e]);
          return n
        },
        reverse: function (e) {
          var t = [];
          if (Array.prototype.reverse) t = e.reverse();
          else
            for (var r = 0; r < e.length; r++) t.unshift(e[r]);
          return t
        },
        getEnv: function () {
          var e = !0;
          try {
            e = !window || !navigator
          } catch (t) {
            e = !0
          }
          return e
        }
      },
      y = f;
    exports.default = y;
  }, {
    "../status": "KLYY"
  }],
  "K0yk": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = t(require("./status"));

    function t(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function r(e) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(e)
    }
    var n = function () {},
      o = (0, e.default)(),
      a = function () {
        try {
          return new window.XMLHttpRequest
        } catch (e) {
          return !1
        }
      },
      i = function () {
        try {
          return new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
          return !1
        }
      },
      s = function (e) {
        e = e || !0;
        var t = a() || i();
        if ("withCredentials" in t) return t;
        if (!e) return t;
        if (void 0 === window.XDomainRequest) return t;
        var r = new XDomainRequest;
        return r.readyState = 0, r.status = 100, r.onreadystatechange = n, r.onload = function () {
          r.readyState = 4, r.status = 200;
          var e = new ActiveXObject("Microsoft.XMLDOM");
          e.async = "false", e.loadXML(r.responseText), r.responseXML = e, r.response = r.responseText, r.onreadystatechange()
        }, r.ontimeout = r.onerror = function () {
          r.readyState = 4, r.status = 500, r.onreadystatechange()
        }, r
      },
      l = function () {
        if ("ActiveXObject" in window) try {
          return new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
        } catch (e) {
          return 0
        } else if (navigator.plugins && navigator.plugins.length > 0) return navigator.plugins["Shockwave Flash"];
        return 0
      }(),
      d = s(),
      u = "undefined" != typeof FormData,
      p = "undefined" != typeof Blob,
      c = d.setRequestHeader || !1,
      f = d.overrideMimeType || !1,
      y = c && u,
      v = y || l,
      h = c && (p || f);
    Object.keys || (Object.keys = function () {
      var e = Object.prototype.hasOwnProperty,
        t = !{
          toString: null
        }.propertyIsEnumerable("toString"),
        n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        o = n.length;
      return function (a) {
        if ("object" !== r(a) && ("function" != typeof a || null === a)) throw new TypeError("Object.keys called on non-object");
        var i, s, l = [];
        for (i in a) e.call(a, i) && l.push(i);
        if (t)
          for (s = 0; s < o; s++) e.call(a, n[s]) && l.push(n[s]);
        return l
      }
    }());
    var O = {
        hasFormData: u,
        hasBlob: p,
        emptyfn: n,
        isCanSetRequestHeader: c,
        hasOverrideMimeType: f,
        isCanUploadFileAsync: y,
        isCanUploadFile: v,
        isCanDownLoadFile: h,
        isSupportWss: function () {
          var e = [/MQQBrowser[\/]5([.]\d+)?\sTBS/];
          if (!window.WebSocket) return !1;
          for (var t = window.navigator.userAgent, r = 0, n = e.length; r < n; r++)
            if (e[r].test(t)) return !1;
          return !0
        }(),
        getIEVersion: function () {
          var e, t = navigator.userAgent;
          return (e = t.match(/MSIE (\d+)/i)) && e[1] ? +e[1] : (e = t.match(/Trident\/(\d+)/i)) && e[1] && {
            4: 8,
            5: 9,
            6: 10,
            7: 11
          } [e[1]] || null
        }(),
        stringify: function (e) {
          if ("undefined" != typeof JSON && JSON.stringify) return JSON.stringify(e);
          var t = "",
            n = [];
          return function e(o) {
            var a = !1;
            for (var i in "[object Array]" === Object.prototype.toString.call(o) ? (n.push("]", "["), a = !0) : "[object Object]" === Object.prototype.toString.call(o) && n.push("}", "{"), o) "[object Null]" === Object.prototype.toString.call(o[i]) ? o[i] = "null" : "[object Undefined]" === Object.prototype.toString.call(o[i]) && (o[i] = "undefined"), o[i] && "object" === r(o[i]) ? t += "," + (a ? "" : '"' + i + '":' + (a ? '"' : "")) + e(o[i]) : t += ',"' + (a ? "" : i + '":"') + o[i] + '"';
            return "" != t && (t = t.slice(1)), n.pop() + t + n.pop()
          }(e)
        },
        login: function (e) {
          var t = (e = e || {}).success || n,
            r = e.error || n,
            a = (e.appKey || "").split("#");
          if (2 !== a.length) return r({
            type: o.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
          }), !1;
          var i = a[0],
            s = a[1],
            l = l || e.https,
            d = e.user || "",
            u = e.pwd || "",
            p = e.apiUrl,
            c = {
              grant_type: "password",
              username: d,
              password: u,
              timestamp: +new Date
            };
          e = {
            url: p + "/" + i + "/" + s + "/token",
            dataType: "json",
            data: O.stringify(c),
            success: t,
            error: r
          };
          return O.ajax(e)
        },
        getFileUrl: function (e) {
          var t = {
              url: "",
              filename: "",
              filetype: "",
              data: ""
            },
            r = "string" == typeof e ? document.getElementById(e) : e;
          if (!O.isCanUploadFileAsync || !r) return t;
          try {
            if (window.URL.createObjectURL) {
              var n = r.files;
              if (n.length > 0) {
                var o = n.item(0);
                t.data = o, t.url = window.URL.createObjectURL(o), t.filename = o.name || ""
              }
            } else {
              o = document.getElementById(e).value;
              t.url = o;
              var a = o.lastIndexOf("/"),
                i = o.lastIndexOf("\\"),
                s = Math.max(a, i);
              t.filename = s < 0 ? o : o.substring(s + 1)
            }
            var l = t.filename.lastIndexOf(".");
            return -1 != l && (t.filetype = t.filename.substring(l + 1).toLowerCase()), t
          } catch (d) {
            throw d
          }
        },
        getFileSize: function (e) {
          var t = this.getFileLength(e);
          if (t > 1e7) return !1;
          var r = Math.round(t / 1e3);
          if (r < 1e3) t = r + " KB";
          else if (r >= 1e3) {
            var n = r / 1e3;
            if (n < 1e3) t = n.toFixed(1) + " MB";
            else t = (n / 1e3).toFixed(1) + " GB"
          }
          return t
        },
        getFileLength: function (e) {
          var t = 0;
          if (e)
            if (e.files) e.files.length > 0 && (t = e.files[0].size);
            else if (e.select && "ActiveXObject" in window) {
            e.select(), t = (e = new ActiveXObject("Scripting.FileSystemObject").GetFile(e.value)).Size
          }
          return t
        },
        hasFlash: l,
        trim: function (e) {
          return (e = "string" == typeof e ? e : "").trim ? e.trim() : e.replace(/^\s|\s$/g, "")
        },
        parseLink: function (e) {
          return e = e.replace(/(https?\:\/\/|www\.)([a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+)(\:[0-9]{2,4})?\/?((\.[:_0-9a-zA-Z-]+)|[:_0-9a-zA-Z-]*\/?)*\??[:_#@*&%0-9a-zA-Z-\/=]*/gm, function (e) {
            return "<a href='" + (/^https?/gm.test(e) ? e : "//" + e) + "' target='_blank'>" + e + "</a>"
          })
        },
        parseJSON: function (e) {
          if (window.JSON && window.JSON.parse) return window.JSON.parse(e + "");
          var t, r = null,
            n = O.trim(e + "");
          return n && !O.trim(n.replace(/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g, function (e, n, o, a) {
            return t && n && (r = 0), 0 === r ? e : (t = o || n, r += !a - !o, "")
          })) ? Function("return " + n)() : Function("Invalid JSON: " + e)()
        },
        parseUploadResponse: function (e) {
          return e.indexOf("callback") > -1 ? e.slice(9, -1) : e
        },
        parseDownloadResponse: function (e) {
          return e && e.type && "application/json" === e.type || 0 > Object.prototype.toString.call(e).indexOf("Blob") ? this.url + "?token=" : window.URL.createObjectURL(e)
        },
        uploadFile: function (e) {
          (e = e || {}).onFileUploadProgress = e.onFileUploadProgress || n, e.onFileUploadComplete = e.onFileUploadComplete || n, e.onFileUploadError = e.onFileUploadError || n, e.onFileUploadCanceled = e.onFileUploadCanceled || n;
          var t = e.accessToken || this.context.accessToken;
          if (t) {
            var r, a, i, s = e.appKey || this.context.appKey || "";
            if (s && (r = (i = s.split("#"))[0], a = i[1]), r || a) {
              var l = e.apiUrl;
              this.isHttpDNS && (l = this.apiUrl);
              var d = e.uploadUrl || l + "/" + r + "/" + a + "/chatfiles";
              if (O.isCanUploadFileAsync)
                if ((e.file.data ? e.file.data.size : void 0) <= 0) e.onFileUploadError({
                  type: o.WEBIM_UPLOADFILE_ERROR,
                  id: e.id
                });
                else {
                  var u = O.xmlrequest();
                  u.upload && u.upload.addEventListener("progress", e.onFileUploadProgress, !1), u.addEventListener ? (u.addEventListener("abort", e.onFileUploadCanceled, !1), u.addEventListener("load", function (t) {
                    try {
                      var r = O.parseJSON(u.responseText);
                      try {
                        e.onFileUploadComplete(r)
                      } catch (t) {
                        e.onFileUploadError({
                          type: o.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                          data: t
                        })
                      }
                    } catch (t) {
                      e.onFileUploadError({
                        type: o.WEBIM_UPLOADFILE_ERROR,
                        data: u.responseText,
                        id: e.id,
                        xhr: u
                      })
                    }
                  }, !1), u.addEventListener("error", function (t) {
                    e.onFileUploadError({
                      type: o.WEBIM_UPLOADFILE_ERROR,
                      id: e.id,
                      xhr: u
                    })
                  }, !1)) : u.onreadystatechange && (u.onreadystatechange = function () {
                    if (4 === u.readyState)
                      if (200 === ajax.status) try {
                        var t = O.parseJSON(u.responseText);
                        e.onFileUploadComplete(t)
                      } catch (r) {
                        e.onFileUploadError({
                          type: o.WEBIM_UPLOADFILE_ERROR,
                          data: u.responseText,
                          id: e.id,
                          xhr: u
                        })
                      } else e.onFileUploadError({
                        type: o.WEBIM_UPLOADFILE_ERROR,
                        data: u.responseText,
                        id: e.id,
                        xhr: u
                      });
                      else u.abort(), e.onFileUploadCanceled()
                  }), u.open("POST", d), u.setRequestHeader("restrict-access", "true"), u.setRequestHeader("Accept", "*/*"), u.setRequestHeader("Authorization", "Bearer " + t);
                  var p = new FormData;
                  p.append("file", e.file.data), window.XDomainRequest && (u.readyState = 2), u.send(p)
                }
              else O.hasFlash && "function" == typeof e.flashUpload ? e.flashUpload && e.flashUpload(d, e) : e.onFileUploadError({
                type: o.WEBIM_UPLOADFILE_BROWSER_ERROR,
                id: e.id
              })
            } else e.onFileUploadError({
              type: o.WEBIM_UPLOADFILE_ERROR,
              id: e.id
            })
          } else e.onFileUploadError({
            type: o.WEBIM_UPLOADFILE_NO_LOGIN,
            id: e.id
          })
        },
        download: function (e) {
          e.onFileDownloadComplete = e.onFileDownloadComplete || n, e.onFileDownloadError = e.onFileDownloadError || n;
          var t = e.accessToken || this.context.accessToken;
          if (t) {
            if (O.isCanDownLoadFile) {
              var r = O.xmlrequest();
              "addEventListener" in r ? (r.addEventListener("load", function (t) {
                e.onFileDownloadComplete(r.response, r)
              }, !1), r.addEventListener("error", function (t) {
                e.onFileDownloadError({
                  type: o.WEBIM_DOWNLOADFILE_ERROR,
                  id: e.id,
                  xhr: r
                })
              }, !1)) : "onreadystatechange" in r && (r.onreadystatechange = function () {
                4 === r.readyState ? 200 === ajax.status ? e.onFileDownloadComplete(r.response, r) : e.onFileDownloadError({
                  type: o.WEBIM_DOWNLOADFILE_ERROR,
                  id: e.id,
                  xhr: r
                }) : (r.abort(), e.onFileDownloadError({
                  type: o.WEBIM_DOWNLOADFILE_ERROR,
                  id: e.id,
                  xhr: r
                }))
              });
              var a = e.method || "GET",
                i = e.responseType || "blob",
                s = e.mimeType || "text/plain; charset=x-user-defined";
              r.open(a, e.url), "undefined" != typeof Blob ? r.responseType = i : r.overrideMimeType(s);
              var l = {
                  "X-Requested-With": "XMLHttpRequest",
                  Accept: "application/octet-stream",
                  "share-secret": e.secret,
                  Authorization: "Bearer " + t
                },
                d = e.headers || {};
              for (var u in d) l[u] = d[u];
              for (var u in l) l[u] && r.setRequestHeader(u, l[u]);
              window.XDomainRequest && (r.readyState = 2), r.send(null)
            } else e.onFileDownloadComplete()
          } else e.onFileDownloadError({
            type: o.WEBIM_DOWNLOADFILE_NO_LOGIN,
            id: e.id
          })
        },
        parseTextMessage: function (e, t) {
          if ("string" == typeof e) {
            if ("[object Object]" !== Object.prototype.toString.call(t)) return {
              isemoji: !1,
              body: [{
                type: "txt",
                data: e
              }]
            };
            var r = e,
              n = [],
              o = r.match(/\[[^[\]]{2,3}\]/gm);
            if (!o || o.length < 1) return {
              isemoji: !1,
              body: [{
                type: "txt",
                data: e
              }]
            };
            for (var a = !1, i = 0; i < o.length; i++) {
              var s = r.substring(0, r.indexOf(o[i])),
                l = WebIM.Emoji.map[o[i]];
              if (s && n.push({
                  type: "txt",
                  data: s
                }), l) {
                var d = WebIM.Emoji.map ? WebIM.Emoji.path + l : null;
                d ? (a = !0, n.push({
                  type: "emoji",
                  data: d
                })) : n.push({
                  type: "txt",
                  data: o[i]
                });
                var u = r.indexOf(o[i]) + o[i].length;
                r = r.substring(u)
              } else n.push({
                type: "txt",
                data: o[i]
              })
            }
            return r && n.push({
              type: "txt",
              data: r
            }), a ? {
              isemoji: a,
              body: n
            } : {
              isemoji: !1,
              body: [{
                type: "txt",
                data: e
              }]
            }
          }
        },
        parseUri: function () {
          var e = {};
          if (window.location.search) {
            var t = window.location.search.match(/([^\?|&])\w+=([^&]+)/g);
            for (var r in t) {
              var n = t[r],
                o = n.indexOf("="),
                a = n.substr(0, o),
                i = n.substr(o + 1);
              e[a] = i
            }
          }
          return e
        },
        parseHrefHash: function () {
          var e = {};
          if (window.location.hash) {
            var t = window.location.hash.match(/([^\#|&])\w+=([^&]+)/g);
            for (var r in t) {
              var n = t[r],
                o = n.indexOf("="),
                a = n.substr(0, o),
                i = n.substr(o + 1);
              e[a] = i
            }
          }
          return e
        },
        xmlrequest: s,
        getXmlFirstChild: function (e, t) {
          var r = e.getElementsByTagName(t);
          return 0 == r.length ? null : r[0]
        },
        wxRequest: function (e) {
          var t = e.success || n,
            r = e.error || n,
            o = e.type || "POST",
            a = e.data || null,
            i = "";
          if ("get" === o.toLowerCase() && a) {
            for (var s in a) a.hasOwnProperty(s) && (i += s + "=" + a[s] + "&");
            i = i ? i.slice(0, -1) : i, e.url += (e.url.indexOf("?") > 0 ? "&" : "?") + (i ? i + "&" : i) + "_v=" + (new Date).getTime(), a = null, i = null
          }
          console.log("wx.request", e.url), wx.request({
            url: e.url,
            data: e.data,
            header: e.headers,
            method: o,
            success: function (e) {
              console.log("wx.request.success", arguments), "200" == e.statusCode ? t(e.data) : r(e)
            },
            complete: function () {
              console.log("wx.request.complete", arguments)
            },
            fail: function () {
              console.log("wx.request.fail", arguments)
            }
          })
        },
        ajax: function (e) {
          var t = e.dataType || "text",
            r = e.success || n,
            a = e.error || n,
            i = O.xmlrequest();
          i.onreadystatechange = function () {
            if (4 !== i.readyState) 0 === i.readyState && a({
              type: o.WEBIM_CONNCTION_AJAX_ERROR,
              data: i.responseText
            });
            else {
              if (200 === (i.status || 0)) {
                try {
                  switch (t) {
                    case "text":
                      return void r(i.responseText);
                    case "json":
                      var e = O.parseJSON(i.responseText);
                      return void r(e, i);
                    case "xml":
                      return void(i.responseXML && i.responseXML.documentElement ? r(i.responseXML.documentElement, i) : a({
                        type: o.WEBIM_CONNCTION_AJAX_ERROR,
                        data: i.responseText
                      }))
                  }
                  r(i.response || i.responseText, i)
                } catch (n) {}
                return
              }
              a({
                type: o.WEBIM_CONNCTION_AJAX_ERROR,
                data: i.responseText
              })
            }
          }, e.responseType && i.responseType && (i.responseType = e.responseType), e.mimeType && O.hasOverrideMimeType && i.overrideMimeType(e.mimeType);
          var s = e.type || "POST",
            l = e.data || null,
            d = "";
          if ("get" === s.toLowerCase() && l) {
            for (var u in l) l.hasOwnProperty(u) && (d += u + "=" + l[u] + "&");
            d = d ? d.slice(0, -1) : d, e.url += (e.url.indexOf("?") > 0 ? "&" : "?") + (d ? d + "&" : d) + "_v=" + (new Date).getTime(), l = null, d = null
          }
          if (i.open(s, e.url, O.isCanSetRequestHeader), O.isCanSetRequestHeader) {
            var p = e.headers || {};
            for (var c in p) p.hasOwnProperty(c) && i.setRequestHeader(c, p[c])
          }
          return window.XDomainRequest && (i.readyState = 2), i.send(l), i
        },
        ts: function () {
          var e = new Date,
            t = e.getHours(),
            r = e.getMinutes(),
            n = e.getSeconds();
          return (t < 10 ? "0" + t : t) + ":" + (r < 10 ? "0" + r : r) + ":" + (n < 10 ? "0" + n : n) + ":" + e.getMilliseconds() + " "
        },
        getObjectKey: function (e, t) {
          for (var r in e)
            if (e[r] == t) return r;
          return ""
        },
        sprintf: function () {
          var e, t, r = arguments,
            n = r[0] || "";
          for (e = 1, t = r.length; e < t; e++) n = n.replace(/%s/, r[e]);
          return n
        },
        setCookie: function (e, t, r) {
          var n = e + "=" + encodeURIComponent(t);
          "number" == typeof r && (n += "; max-age: " + 60 * r * 60 * 24), document.cookie = n
        },
        getCookie: function () {
          var e = {},
            t = document.cookie;
          if ("" === t) return e;
          for (var r = t.split("; "), n = 0; n < r.length; n++) {
            var o = r[n],
              a = o.indexOf("="),
              i = o.substring(0, a),
              s = o.substring(a + 1);
            s = decodeURIComponent(s), e[i] = s
          }
          return e
        },
        reverse: function (e) {
          var t = [];
          if (Array.prototype.reverse) t = e.reverse();
          else
            for (var r = 0; r < e.length; r++) t.unshift(e[r]);
          return t
        },
        useWxProgram: function () {
          O.ajax = O.wxRequest
        },
        getEnv: function () {
          var e = !0;
          try {
            e = !window || !navigator
          } catch (t) {
            e = !0
          }
          return e
        }
      },
      m = O;
    exports.default = m;
  }, {
    "./status": "KLYY"
  }],
  "KTph": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e, t = o(require("./checkEnv"));

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    e = t.default ? require("./wx/utils").default : require("./utils").default;
    var i = function e(t, o) {
      return !this instanceof e ? new e(t) : (this._msg = {}, "function" == typeof e[t] && (e[t].prototype.setGroup = this.setGroup, this._msg = new e[t](o)), this._msg)
    };
    i.prototype.setGroup = function (e) {
      this.body.group = e
    }, i.read = function (e) {
      this.id = e, this.type = "read"
    }, i.read.prototype.set = function (e) {
      this.body = {
        id: this.id,
        type: this.type,
        ackId: e.id,
        to: e.to,
        msgConfig: e.msgConfig,
        ackContent: e.ackContent
      }, !e.msgConfig && delete this.body.msgConfig, !e.ackContent && delete this.body.ackContent
    }, i.delivery = function (e) {
      this.id = e, this.type = "delivery"
    }, i.delivery.prototype.set = function (e) {
      this.body = {
        id: this.id,
        type: this.type,
        ackId: e.ackId,
        to: e.to
      }
    }, i.txt = function (e) {
      this.id = e, this.type = "txt", this.body = {}
    }, i.txt.prototype.set = function (e) {
      this.value = e.msg, this.body = {
        id: this.id,
        to: e.to,
        from: e.from,
        msg: this.value,
        type: this.type,
        roomType: e.roomType,
        ext: e.ext || {},
        success: e.success,
        fail: e.fail,
        msgConfig: e.msgConfig
      }, !e.msgConfig && delete this.body.msgConfig, !e.roomType && delete this.body.roomType
    }, i.cmd = function (e) {
      this.id = e, this.type = "cmd", this.body = {}
    }, i.cmd.prototype.set = function (e) {
      this.value = "", this.body = {
        id: this.id,
        to: e.to,
        from: e.from,
        action: e.action,
        msg: this.value,
        type: this.type,
        roomType: e.roomType,
        ext: e.ext || {},
        success: e.success
      }, !e.roomType && delete this.body.roomType
    }, i.custom = function (e) {
      this.id = e, this.type = "custom", this.body = {}
    }, i.custom.prototype.set = function (e) {
      this.body = {
        id: this.id,
        to: e.to,
        from: e.from,
        params: e.params,
        customEvent: e.customEvent,
        customExts: e.customExts,
        type: this.type,
        roomType: e.roomType,
        ext: e.ext || {},
        success: e.success
      }, !e.roomType && delete this.body.roomType
    }, i.location = function (e) {
      this.id = e, this.type = "loc", this.body = {}
    }, i.location.prototype.set = function (e) {
      this.body = {
        id: this.id,
        to: e.to,
        type: this.type,
        roomType: e.roomType,
        addr: e.addr,
        lat: e.lat,
        lng: e.lng,
        ext: e.ext || {}
      }
    }, i.img = function (e) {
      this.id = e, this.type = "img", this.body = {}
    }, i.img.prototype.set = function (t) {
      t.file = t.file || e.getFileUrl(t.fileInputId), this.value = t.file, this.body = {
        id: this.id,
        file: this.value,
        apiUrl: t.apiUrl,
        to: t.to,
        from: t.from,
        type: this.type,
        ext: t.ext || {},
        roomType: t.roomType,
        onFileUploadError: t.onFileUploadError,
        onFileUploadComplete: t.onFileUploadComplete,
        success: t.success,
        fail: t.fail,
        flashUpload: t.flashUpload,
        width: t.width,
        height: t.height,
        body: t.body,
        uploadError: t.uploadError,
        uploadComplete: t.uploadComplete
      }, !t.roomType && delete this.body.roomType
    }, i.audio = function (e) {
      this.id = e, this.type = "audio", this.body = {}
    }, i.audio.prototype.set = function (t) {
      t.file = t.file || e.getFileUrl(t.fileInputId), this.value = t.file, this.filename = t.filename || this.value.filename, this.body = {
        id: this.id,
        file: this.value,
        filename: this.filename,
        apiUrl: t.apiUrl,
        to: t.to,
        from: t.from,
        type: this.type,
        ext: t.ext || {},
        length: t.length || 0,
        roomType: t.roomType,
        file_length: t.file_length,
        onFileUploadError: t.onFileUploadError,
        onFileUploadComplete: t.onFileUploadComplete,
        success: t.success,
        fail: t.fail,
        flashUpload: t.flashUpload,
        body: t.body
      }, !t.roomType && delete this.body.roomType
    }, i.file = function (e) {
      this.id = e, this.type = "file", this.body = {}
    }, i.file.prototype.set = function (t) {
      t.file = t.file || e.getFileUrl(t.fileInputId), this.value = t.file, this.filename = t.filename || this.value.filename, this.body = {
        id: this.id,
        file: this.value,
        filename: this.filename,
        apiUrl: t.apiUrl,
        to: t.to,
        from: t.from,
        type: this.type,
        ext: t.ext || {},
        roomType: t.roomType,
        onFileUploadError: t.onFileUploadError,
        onFileUploadComplete: t.onFileUploadComplete,
        success: t.success,
        fail: t.fail,
        flashUpload: t.flashUpload,
        body: t.body
      }, !t.roomType && delete this.body.roomType
    }, i.video = function (e) {
      this.id = e, this.type = "video", this.body = {}
    }, i.video.prototype.set = function (t) {
      t.file = t.file || e.getFileUrl(t.fileInputId), this.value = t.file, this.filename = t.filename || this.value.filename, this.body = {
        id: this.id,
        file: this.value,
        filename: this.filename,
        apiUrl: t.apiUrl,
        to: t.to,
        from: t.from,
        type: this.type,
        ext: t.ext || {},
        length: t.length || 0,
        roomType: t.roomType,
        file_length: t.file_length,
        onFileUploadError: t.onFileUploadError,
        onFileUploadComplete: t.onFileUploadComplete,
        success: t.success,
        fail: t.fail,
        flashUpload: t.flashUpload,
        body: t.body
      }, !t.roomType && delete this.body.roomType
    };
    var s = {
        message: i
      },
      l = i;
    exports.default = l;
  }, {
    "./checkEnv": "PkDd",
    "./wx/utils": "a9jn",
    "./utils": "K0yk"
  }],
  "RCHR": [function (require, module, exports) {
    "use strict";

    function t(t) {
      this.array = void 0 === t ? [] : new Array(t)
    }
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0, t.prototype = {
      length: function () {
        return this.array.length
      },
      at: function (t) {
        return this.array[t]
      },
      set: function (t, r) {
        this.array[t] = r
      },
      push: function (t) {
        return this.array.push(t)
      },
      slice: function (t, r) {
        return this.array = this.array.slice(t, r)
      },
      concat: function (t) {
        this.array = this.array.concat(t)
      },
      remove: function (t, r) {
        r = void 0 === r ? 1 : r, this.array.splice(t, r)
      },
      join: function (t) {
        return this.array.join(t)
      },
      clear: function () {
        this.array.length = 0
      }
    };
    var r = function () {
      this._array_h = new t
    };
    r.prototype = {
      _index: 0,
      push: function (t) {
        this._array_h.push(t)
      },
      pop: function () {
        var t = null;
        return this._array_h.length() && (t = this._array_h.at(this._index), 2 * ++this._index >= this._array_h.length() && (this._array_h.slice(this._index), this._index = 0)), t
      },
      head: function () {
        var t = null,
          r = this._array_h.length();
        return r && (t = this._array_h.at(r - 1)), t
      },
      tail: function () {
        var t = null;
        return this._array_h.length() && (t = this._array_h.at(this._index)), t
      },
      length: function () {
        return this._array_h.length() - this._index
      },
      empty: function () {
        return 0 === this._array_h.length()
      },
      clear: function () {
        this._array_h.clear()
      }
    };
    var n = r;
    exports.default = n;
  }, {}],
  "Aofe": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e, t = o(require("../checkEnv"));

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function a(e) {
      return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(e)
    }

    function n(e) {
      if (e && "object" == a(e)) {
        var t = [],
          o = this.context.root.lookup("easemob.pb.KeyValue"),
          n = [];
        for (var i in e) {
          var m = o.decode(t);
          m.key = i, "object" == a(e[i]) ? (m.type = 8, m.stringValue = JSON.stringify(e[i])) : "string" == typeof e[i] ? (m.type = 7, m.stringValue = e[i]) : "boolean" == typeof e[i] ? (m.type = 1, m.varintValue = e[i]) : Number.isInteger(e[i]) ? (m.type = 2, m.varintValue = e[i]) : (m.type = 6, m.doubleValue = e[i]), n.push(m)
        }
        return n
      }
    }
    e = t.default ? require("../wx/utils").default : require("../utils").default;
    var i = function (e, t) {
        t.isDebug && console.log("上行消息：", e);
        var o = [],
          i = t.context.root.lookup("easemob.pb.MessageBody.Content").decode(o),
          m = t.context.root.lookup("easemob.pb.KeyValue"),
          r = [];
        switch (e.type) {
          case "txt":
            i.type = 0, i.text = e.msg;
            break;
          case "img":
            i.type = 1, i.displayName = e.body.filename, i.remotePath = e.body.url, i.secretKey = e.body.secret, i.fileLength = e.body.file_length, i.size = e.body.size, i.thumbnailDisplayName = e.body.filename;
            break;
          case "video":
            i.type = 2, i.displayName = e.body.filename, i.remotePath = e.body.url, i.secretKey = e.body.secret, i.fileLength = e.body.file_length, i.duration = e.body.length, i.thumbnailDisplayName = e.body.filename;
            break;
          case "loc":
            i.type = 3, i.latitude = e.lat, i.longitude = e.lng, i.address = e.addr, i.latitude = e.lat;
            break;
          case "audio":
            i.type = 4, i.displayName = e.body.filename, i.remotePath = e.body.url, i.secretKey = e.body.secret, i.fileLength = e.body.file_length, i.duration = e.body.length, i.size = e.body.size, i.thumbnailDisplayName = e.body.filename;
            break;
          case "file":
            i.type = 5, i.displayName = e.body.filename, i.remotePath = e.body.url, i.secretKey = e.body.secret, i.fileLength = e.body.file_length, i.size = e.body.size, i.thumbnailDisplayName = e.body.filename;
            break;
          case "cmd":
            i.type = 6, i.action = e.action;
            break;
          case "custom":
            i.type = 7, i.params = n.call(t, e.params), i.customEvent = e.customEvent, i.customExts = n.call(t, e.customExts)
        }
        if (e.ext)
          for (var s in e.ext) {
            var p = m.decode(o);
            p.key = s, "object" == a(e.ext[s]) ? (p.type = 8, p.stringValue = JSON.stringify(e.ext[s])) : "string" == typeof e.ext[s] ? (p.type = 7, p.stringValue = e.ext[s]) : "boolean" == typeof e.ext[s] ? (p.type = 1, p.varintValue = e.ext[s]) : Number.isInteger(e.ext[s]) ? (p.type = 2, p.varintValue = e.ext[s]) : (p.type = 6, p.doubleValue = e.ext[s]), r.push(p)
          }
        var l = t.context.root.lookup("easemob.pb.MessageBody"),
          y = l.decode(o);
        "recall" === e.type ? (y.type = 6, y.from = {
          name: t.context.jid.name
        }, y.to = {
          name: e.to
        }, y.ackMessageId = e.ackId) : "delivery" === e.type ? (y.type = 5, y.from = {
          name: t.context.jid.name
        }, y.to = {
          name: e.to
        }, y.ackMessageId = e.ackId) : "read" === e.type ? (y.type = 4, y.from = {
          name: t.context.jid.name
        }, y.to = {
          name: e.to
        }, y.ackMessageId = e.ackId, e.msgConfig && "groupchat" === e.group && !e.roomType && (y.msgConfig = e.msgConfig, y.ackContent = e.ackContent)) : e.group || e.roomType ? "groupchat" !== e.group || e.roomType ? "groupchat" === e.group && e.roomType && (y.type = 3, y.from = {
          name: t.context.jid.name
        }, y.to = {
          name: e.to
        }) : (y.type = 2, y.from = {
          name: t.context.jid.name
        }, y.to = {
          name: e.to
        }, e.msgConfig && (y.msgConfig = e.msgConfig)) : (y.type = 1, y.from = {
          name: t.context.jid.name
        }, y.to = {
          name: e.to
        }), y.contents = [i], y.ext = r, y = l.encode(y).finish();
        var c = t.context.root.lookup("easemob.pb.Meta").decode(o);
        if (c.id = e.id, "recall" === e.type) {
          c.from = t.context.jid;
          var d = "easemob.com";
          "groupchat" !== e.group && "chatroom" !== e.group || (d = "conference.easemob.com"), c.to = {
            appKey: t.appKey,
            name: e.to,
            domain: d
          }
        } else if ("delivery" === e.type) c.from = t.context.jid, c.to = {
          appKey: t.appKey,
          name: e.to,
          domain: "easemob.com"
        };
        else if ("read" === e.type) {
          c.from = t.context.jid;
          d = "easemob.com";
          "groupchat" === e.group && (d = "conference.easemob.com"), c.to = {
            appKey: t.appKey,
            name: e.to,
            domain: d
          }
        } else e.group || e.roomType ? "groupchat" !== e.group || e.roomType ? "groupchat" === e.group && e.roomType && (c.from = {
          appKey: t.appKey,
          name: t.user,
          domain: "conference.easemob.com"
        }, c.to = {
          appKey: t.appKey,
          name: e.to,
          domain: "conference.easemob.com"
        }) : (c.from = {
          appKey: t.appKey,
          name: t.user,
          domain: "conference.easemob.com"
        }, c.to = {
          appKey: t.appKey,
          name: e.to,
          domain: "conference.easemob.com"
        }) : (c.from = t.context.jid, c.to = {
          appKey: t.appKey,
          name: e.to,
          domain: "easemob.com"
        });
        c.ns = 1, c.payload = y;
        var u = t.context.root.lookup("easemob.pb.CommSyncUL"),
          f = u.decode(o);
        f.meta = c, f = u.encode(f).finish();
        var g = t.context.root.lookup("easemob.pb.MSync"),
          b = g.decode(o);
        b.version = t.version, b.encryptType = t.encryptType, b.command = 0, b.guid = t.context.jid, b.payload = f, b = g.encode(b).finish(), t.sendMSync(b)
      },
      m = function (t, o) {
        var a = o || this;
        if (a.msg = t, t.file) {
          if (a.msg.body && a.msg.body.url) return void i(a.msg, o);
          var n = a.msg.onFileUploadComplete;
          a.msg.onFileUploadComplete = function (e) {
            if (e.entities[0]["file-metadata"]) {
              var t = e.entities[0]["file-metadata"]["content-length"];
              a.msg.filetype = e.entities[0]["file-metadata"]["content-type"], t > 204800 && (a.msg.thumbnail = !0)
            }
            a.msg.body = {
              type: a.msg.type || "file",
              url: (o.isHttpDNS ? o.apiUrl + e.uri.substr(e.uri.indexOf("/", 9)) : e.uri) + "/" + e.entities[0].uuid,
              secret: e.entities[0]["share-secret"],
              filename: a.msg.file.filename || a.msg.filename,
              size: {
                width: a.msg.width || 0,
                height: a.msg.height || 0
              },
              length: a.msg.length || 0,
              file_length: a.msg.ext.file_length || 0,
              filetype: a.msg.filetype || a.msg.file.filetype
            }, i(a.msg, o), n instanceof Function && n(e, a.msg.id)
          }, e.uploadFile.call(o, a.msg)
        } else i(a.msg, o)
      },
      r = m;
    exports.default = r;
  }, {
    "../checkEnv": "PkDd",
    "../wx/utils": "a9jn",
    "../utils": "K0yk"
  }],
  "YA3p": [function (require, module, exports) {
    module.exports = t;
    var i = null;
    try {
      i = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports
    } catch (L) {}

    function t(i, t, n) {
      this.low = 0 | i, this.high = 0 | t, this.unsigned = !!n
    }

    function n(i) {
      return !0 === (i && i.__isLong__)
    }
    t.prototype.__isLong__, Object.defineProperty(t.prototype, "__isLong__", {
      value: !0
    }), t.isLong = n;
    var h = {},
      s = {};

    function e(i, t) {
      var n, e, r;
      return t ? (r = 0 <= (i >>>= 0) && i < 256) && (e = s[i]) ? e : (n = u(i, (0 | i) < 0 ? -1 : 0, !0), r && (s[i] = n), n) : (r = -128 <= (i |= 0) && i < 128) && (e = h[i]) ? e : (n = u(i, i < 0 ? -1 : 0, !1), r && (h[i] = n), n)
    }

    function r(i, t) {
      if (isNaN(i)) return t ? N : m;
      if (t) {
        if (i < 0) return N;
        if (i >= c) return p
      } else {
        if (i <= -w) return _;
        if (i + 1 >= w) return q
      }
      return i < 0 ? r(-i, t).neg() : u(i % d | 0, i / d | 0, t)
    }

    function u(i, n, h) {
      return new t(i, n, h)
    }
    t.fromInt = e, t.fromNumber = r, t.fromBits = u;
    var o = Math.pow;

    function g(i, t, n) {
      if (0 === i.length) throw Error("empty string");
      if ("NaN" === i || "Infinity" === i || "+Infinity" === i || "-Infinity" === i) return m;
      if ("number" == typeof t ? (n = t, t = !1) : t = !!t, (n = n || 10) < 2 || 36 < n) throw RangeError("radix");
      var h;
      if ((h = i.indexOf("-")) > 0) throw Error("interior hyphen");
      if (0 === h) return g(i.substring(1), t, n).neg();
      for (var s = r(o(n, 8)), e = m, u = 0; u < i.length; u += 8) {
        var f = Math.min(8, i.length - u),
          l = parseInt(i.substring(u, u + f), n);
        if (f < 8) {
          var a = r(o(n, f));
          e = e.mul(a).add(r(l))
        } else e = (e = e.mul(s)).add(r(l))
      }
      return e.unsigned = t, e
    }

    function f(i, t) {
      return "number" == typeof i ? r(i, t) : "string" == typeof i ? g(i, t) : u(i.low, i.high, "boolean" == typeof t ? t : i.unsigned)
    }
    t.fromString = g, t.fromValue = f;
    var l = 65536,
      a = 1 << 24,
      d = l * l,
      c = d * d,
      w = c / 2,
      v = e(a),
      m = e(0);
    t.ZERO = m;
    var N = e(0, !0);
    t.UZERO = N;
    var E = e(1);
    t.ONE = E;
    var y = e(1, !0);
    t.UONE = y;
    var b = e(-1);
    t.NEG_ONE = b;
    var q = u(-1, 2147483647, !1);
    t.MAX_VALUE = q;
    var p = u(-1, -1, !0);
    t.MAX_UNSIGNED_VALUE = p;
    var _ = u(0, -2147483648, !1);
    t.MIN_VALUE = _;
    var B = t.prototype;
    B.toInt = function () {
      return this.unsigned ? this.low >>> 0 : this.low
    }, B.toNumber = function () {
      return this.unsigned ? (this.high >>> 0) * d + (this.low >>> 0) : this.high * d + (this.low >>> 0)
    }, B.toString = function (i) {
      if ((i = i || 10) < 2 || 36 < i) throw RangeError("radix");
      if (this.isZero()) return "0";
      if (this.isNegative()) {
        if (this.eq(_)) {
          var t = r(i),
            n = this.div(t),
            h = n.mul(t).sub(this);
          return n.toString(i) + h.toInt().toString(i)
        }
        return "-" + this.neg().toString(i)
      }
      for (var s = r(o(i, 6), this.unsigned), e = this, u = "";;) {
        var g = e.div(s),
          f = (e.sub(g.mul(s)).toInt() >>> 0).toString(i);
        if ((e = g).isZero()) return f + u;
        for (; f.length < 6;) f = "0" + f;
        u = "" + f + u
      }
    }, B.getHighBits = function () {
      return this.high
    }, B.getHighBitsUnsigned = function () {
      return this.high >>> 0
    }, B.getLowBits = function () {
      return this.low
    }, B.getLowBitsUnsigned = function () {
      return this.low >>> 0
    }, B.getNumBitsAbs = function () {
      if (this.isNegative()) return this.eq(_) ? 64 : this.neg().getNumBitsAbs();
      for (var i = 0 != this.high ? this.high : this.low, t = 31; t > 0 && 0 == (i & 1 << t); t--);
      return 0 != this.high ? t + 33 : t + 1
    }, B.isZero = function () {
      return 0 === this.high && 0 === this.low
    }, B.eqz = B.isZero, B.isNegative = function () {
      return !this.unsigned && this.high < 0
    }, B.isPositive = function () {
      return this.unsigned || this.high >= 0
    }, B.isOdd = function () {
      return 1 == (1 & this.low)
    }, B.isEven = function () {
      return 0 == (1 & this.low)
    }, B.equals = function (i) {
      return n(i) || (i = f(i)), (this.unsigned === i.unsigned || this.high >>> 31 != 1 || i.high >>> 31 != 1) && (this.high === i.high && this.low === i.low)
    }, B.eq = B.equals, B.notEquals = function (i) {
      return !this.eq(i)
    }, B.neq = B.notEquals, B.ne = B.notEquals, B.lessThan = function (i) {
      return this.comp(i) < 0
    }, B.lt = B.lessThan, B.lessThanOrEqual = function (i) {
      return this.comp(i) <= 0
    }, B.lte = B.lessThanOrEqual, B.le = B.lessThanOrEqual, B.greaterThan = function (i) {
      return this.comp(i) > 0
    }, B.gt = B.greaterThan, B.greaterThanOrEqual = function (i) {
      return this.comp(i) >= 0
    }, B.gte = B.greaterThanOrEqual, B.ge = B.greaterThanOrEqual, B.compare = function (i) {
      if (n(i) || (i = f(i)), this.eq(i)) return 0;
      var t = this.isNegative(),
        h = i.isNegative();
      return t && !h ? -1 : !t && h ? 1 : this.unsigned ? i.high >>> 0 > this.high >>> 0 || i.high === this.high && i.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(i).isNegative() ? -1 : 1
    }, B.comp = B.compare, B.negate = function () {
      return !this.unsigned && this.eq(_) ? _ : this.not().add(E)
    }, B.neg = B.negate, B.add = function (i) {
      n(i) || (i = f(i));
      var t = this.high >>> 16,
        h = 65535 & this.high,
        s = this.low >>> 16,
        e = 65535 & this.low,
        r = i.high >>> 16,
        o = 65535 & i.high,
        g = i.low >>> 16,
        l = 0,
        a = 0,
        d = 0,
        c = 0;
      return d += (c += e + (65535 & i.low)) >>> 16, a += (d += s + g) >>> 16, l += (a += h + o) >>> 16, l += t + r, u((d &= 65535) << 16 | (c &= 65535), (l &= 65535) << 16 | (a &= 65535), this.unsigned)
    }, B.subtract = function (i) {
      return n(i) || (i = f(i)), this.add(i.neg())
    }, B.sub = B.subtract, B.multiply = function (t) {
      if (this.isZero()) return m;
      if (n(t) || (t = f(t)), i) return u(i.mul(this.low, this.high, t.low, t.high), i.get_high(), this.unsigned);
      if (t.isZero()) return m;
      if (this.eq(_)) return t.isOdd() ? _ : m;
      if (t.eq(_)) return this.isOdd() ? _ : m;
      if (this.isNegative()) return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
      if (t.isNegative()) return this.mul(t.neg()).neg();
      if (this.lt(v) && t.lt(v)) return r(this.toNumber() * t.toNumber(), this.unsigned);
      var h = this.high >>> 16,
        s = 65535 & this.high,
        e = this.low >>> 16,
        o = 65535 & this.low,
        g = t.high >>> 16,
        l = 65535 & t.high,
        a = t.low >>> 16,
        d = 65535 & t.low,
        c = 0,
        w = 0,
        N = 0,
        E = 0;
      return N += (E += o * d) >>> 16, w += (N += e * d) >>> 16, N &= 65535, w += (N += o * a) >>> 16, c += (w += s * d) >>> 16, w &= 65535, c += (w += e * a) >>> 16, w &= 65535, c += (w += o * l) >>> 16, c += h * d + s * a + e * l + o * g, u((N &= 65535) << 16 | (E &= 65535), (c &= 65535) << 16 | (w &= 65535), this.unsigned)
    }, B.mul = B.multiply, B.divide = function (t) {
      if (n(t) || (t = f(t)), t.isZero()) throw Error("division by zero");
      var h, s, e;
      if (i) return this.unsigned || -2147483648 !== this.high || -1 !== t.low || -1 !== t.high ? u((this.unsigned ? i.div_u : i.div_s)(this.low, this.high, t.low, t.high), i.get_high(), this.unsigned) : this;
      if (this.isZero()) return this.unsigned ? N : m;
      if (this.unsigned) {
        if (t.unsigned || (t = t.toUnsigned()), t.gt(this)) return N;
        if (t.gt(this.shru(1))) return y;
        e = N
      } else {
        if (this.eq(_)) return t.eq(E) || t.eq(b) ? _ : t.eq(_) ? E : (h = this.shr(1).div(t).shl(1)).eq(m) ? t.isNegative() ? E : b : (s = this.sub(t.mul(h)), e = h.add(s.div(t)));
        if (t.eq(_)) return this.unsigned ? N : m;
        if (this.isNegative()) return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
        if (t.isNegative()) return this.div(t.neg()).neg();
        e = m
      }
      for (s = this; s.gte(t);) {
        h = Math.max(1, Math.floor(s.toNumber() / t.toNumber()));
        for (var g = Math.ceil(Math.log(h) / Math.LN2), l = g <= 48 ? 1 : o(2, g - 48), a = r(h), d = a.mul(t); d.isNegative() || d.gt(s);) d = (a = r(h -= l, this.unsigned)).mul(t);
        a.isZero() && (a = E), e = e.add(a), s = s.sub(d)
      }
      return e
    }, B.div = B.divide, B.modulo = function (t) {
      return n(t) || (t = f(t)), i ? u((this.unsigned ? i.rem_u : i.rem_s)(this.low, this.high, t.low, t.high), i.get_high(), this.unsigned) : this.sub(this.div(t).mul(t))
    }, B.mod = B.modulo, B.rem = B.modulo, B.not = function () {
      return u(~this.low, ~this.high, this.unsigned)
    }, B.and = function (i) {
      return n(i) || (i = f(i)), u(this.low & i.low, this.high & i.high, this.unsigned)
    }, B.or = function (i) {
      return n(i) || (i = f(i)), u(this.low | i.low, this.high | i.high, this.unsigned)
    }, B.xor = function (i) {
      return n(i) || (i = f(i)), u(this.low ^ i.low, this.high ^ i.high, this.unsigned)
    }, B.shiftLeft = function (i) {
      return n(i) && (i = i.toInt()), 0 == (i &= 63) ? this : i < 32 ? u(this.low << i, this.high << i | this.low >>> 32 - i, this.unsigned) : u(0, this.low << i - 32, this.unsigned)
    }, B.shl = B.shiftLeft, B.shiftRight = function (i) {
      return n(i) && (i = i.toInt()), 0 == (i &= 63) ? this : i < 32 ? u(this.low >>> i | this.high << 32 - i, this.high >> i, this.unsigned) : u(this.high >> i - 32, this.high >= 0 ? 0 : -1, this.unsigned)
    }, B.shr = B.shiftRight, B.shiftRightUnsigned = function (i) {
      if (n(i) && (i = i.toInt()), 0 === (i &= 63)) return this;
      var t = this.high;
      return i < 32 ? u(this.low >>> i | t << 32 - i, t >>> i, this.unsigned) : u(32 === i ? t : t >>> i - 32, 0, this.unsigned)
    }, B.shru = B.shiftRightUnsigned, B.shr_u = B.shiftRightUnsigned, B.toSigned = function () {
      return this.unsigned ? u(this.low, this.high, !1) : this
    }, B.toUnsigned = function () {
      return this.unsigned ? this : u(this.low, this.high, !0)
    }, B.toBytes = function (i) {
      return i ? this.toBytesLE() : this.toBytesBE()
    }, B.toBytesLE = function () {
      var i = this.high,
        t = this.low;
      return [255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24, 255 & i, i >>> 8 & 255, i >>> 16 & 255, i >>> 24]
    }, B.toBytesBE = function () {
      var i = this.high,
        t = this.low;
      return [i >>> 24, i >>> 16 & 255, i >>> 8 & 255, 255 & i, t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t]
    }, t.fromBytes = function (i, n, h) {
      return h ? t.fromBytesLE(i, n) : t.fromBytesBE(i, n)
    }, t.fromBytesLE = function (i, n) {
      return new t(i[0] | i[1] << 8 | i[2] << 16 | i[3] << 24, i[4] | i[5] << 8 | i[6] << 16 | i[7] << 24, n)
    }, t.fromBytesBE = function (i, n) {
      return new t(i[4] << 24 | i[5] << 16 | i[6] << 8 | i[7], i[0] << 24 | i[1] << 16 | i[2] << 8 | i[3], n)
    };
  }, {}],
  "TvlR": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e, t = a(require("long")),
      r = a(require("./sendChatMessage")),
      o = a(require("../status")),
      s = a(require("../checkEnv")),
      i = a(require("../message"));

    function a(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    e = s.default ? require("../wx/utils").default : require("../utils").default;
    var n = (0, o.default)(),
      g = {
        0: "TEXT",
        1: "IMAGE",
        2: "VIDEO",
        3: "LOCATION",
        4: "VOICE",
        5: "FILE",
        6: "COMMAND",
        7: "CUSTOM"
      },
      d = function (e, t, o) {
        if (e.delivery && t.from !== t.to) {
          var s = e.getUniqueId(),
            a = new i.default("delivery", s);
          a.set({
            ackId: o,
            to: t.from
          }), (0, r.default)(a.body, e)
        }
      },
      l = function (e) {
        if (e) {
          for (var r = e, o = {}, s = 0; s < r.length; s++)
            if (8 == r[s].type) o[r[s].key] = JSON.parse(r[s].stringValue);
            else if (7 == r[s].type) o[r[s].key] = r[s].stringValue;
          else if (6 == r[s].type) o[r[s].key] = r[s].doubleValue;
          else if (5 == r[s].type) o[r[s].key] = r[s].floatValue;
          else if (1 == r[s].type || 2 == r[s].type || 3 == r[s].type || 4 == r[s].type)
            if (2 == r[s].type) {
              var i = r[s].varintValue,
                a = new t.default(i.low, i.high, i.unsigned).toString();
              o[r[s].key] = Number(a)
            } else o[r[s].key] = r[s].varintValue;
          return o
        }
      },
      m = function (r, o, s, i) {
        var a = s,
          m = new t.default(r.timestamp.low, r.timestamp.high, r.timestamp.unsigned).toString(),
          f = a.context.root.lookup("easemob.pb.MessageBody").decode(r.payload),
          y = new t.default(r.id.low, r.id.high, r.id.unsigned).toString(),
          u = f.ackMessageId ? new t.default(f.ackMessageId.low, f.ackMessageId.high, f.ackMessageId.unsigned).toString() : "",
          c = null;
        if (s.isDebug && console.log("下行消息：", f), 1 === f.type) c = "chat";
        else if (2 === f.type) c = "groupchat";
        else if (3 === f.type) c = "chatroom";
        else {
          if (4 === f.type) return c = "read_ack", f.msgConfig ? void s.onReadMessage({
            mid: u,
            groupReadCount: f.ext[0] && JSON.parse(f.ext[0].stringValue),
            ackContent: f.ackContent
          }) : void s.onReadMessage({
            mid: u
          });
          if (5 === f.type) return c = "deliver_ack", void s.onDeliverdMessage({
            mid: u
          });
          if (6 === f.type) return c = "recall", void s.onRecallMessage({
            mid: u
          })
        }
        for (var p = 0; p < f.contents.length; p++) {
          var C = {},
            h = o.errorCode > 0,
            x = o.errorCode,
            k = o.reason,
            v = f.contents[p],
            M = f.from.name,
            T = f.to.name,
            b = {};
          f.ext && (b = l(f.ext));
          try {
            switch (v.type) {
              case 0:
                var E = f.contents[p].text;
                if (!O) var O = {};
                var _ = e.parseTextMessage(E, O && O.Emoji);
                _.isemoji ? (!(C = {
                  id: y,
                  type: c,
                  contentsType: "EMOJI",
                  from: M,
                  to: T,
                  data: _.body,
                  ext: b,
                  time: m,
                  msgConfig: f.msgConfig
                }).delay && delete C.delay, !C.msgConfig && delete f.msgConfig, C.error = h, C.errorText = k, C.errorCode = x, !i && a.onEmojiMessage(C)) : (!(C = {
                  id: y,
                  type: c,
                  contentsType: g[v.type],
                  from: M,
                  to: T,
                  data: v.text,
                  ext: b,
                  sourceMsg: v.text,
                  time: m,
                  msgConfig: f.msgConfig
                }).msgConfig && delete f.msgConfig, C.error = h, C.errorText = k, C.errorCode = x, !i && s.onTextMessage(C));
                break;
              case 1:
                if (v.size) var I = v.size.width || 0,
                  P = v.size.height || 0;
                !(C = {
                  id: y,
                  type: c,
                  contentsType: g[v.type],
                  from: M,
                  to: T,
                  url: v.remotePath && a.apiUrl + v.remotePath.substr(v.remotePath.indexOf("/", 9)),
                  secret: v.secretKey,
                  filename: v.displayName,
                  thumb: v.thumbnailRemotePath,
                  thumb_secret: v.thumbnailSecretKey,
                  file_length: v.fileLength || "",
                  width: I,
                  height: P,
                  filetype: v.filetype || "",
                  accessToken: s.token || "",
                  ext: b,
                  time: m,
                  msgConfig: f.msgConfig
                }).delay && delete C.delay, !C.msgConfig && delete f.msgConfig, C.error = h, C.errorText = k, C.errorCode = x, !i && s.onPictureMessage(C);
                break;
              case 2:
                !(C = {
                  id: y,
                  type: c,
                  contentsType: g[v.type],
                  from: M,
                  to: T,
                  url: v.remotePath && a.apiUrl + v.remotePath.substr(v.remotePath.indexOf("/", 9)),
                  secret: v.secretKey,
                  filename: v.displayName,
                  length: v.duration || "",
                  file_length: v.fileLength || "",
                  filetype: v.filetype || "",
                  accessToken: s.token || "",
                  ext: b,
                  time: m,
                  msgConfig: f.msgConfig
                }).delay && delete C.delay, !C.msgConfig && delete f.msgConfig, C.error = h, C.errorText = k, C.errorCode = x, !i && s.onVideoMessage(C);
                break;
              case 3:
                !(C = {
                  id: y,
                  type: c,
                  contentsType: g[v.type],
                  from: M,
                  to: T,
                  addr: v.address,
                  lat: v.latitude,
                  lng: v.longitude,
                  ext: b,
                  time: m,
                  msgConfig: f.msgConfig
                }).delay && delete C.delay, !C.msgConfig && delete f.msgConfig, C.error = h, C.errorText = k, C.errorCode = x, !i && s.onLocationMessage(C);
                break;
              case 4:
                !(C = {
                  id: y,
                  type: c,
                  contentsType: g[v.type],
                  from: M,
                  to: T,
                  url: v.remotePath && a.apiUrl + v.remotePath.substr(v.remotePath.indexOf("/", 9)),
                  secret: v.secretKey,
                  filename: v.displayName,
                  file_length: v.fileLength || "",
                  accessToken: s.token || "",
                  ext: b,
                  length: v.duration,
                  time: m,
                  msgConfig: f.msgConfig
                }).delay && delete C.delay, !C.msgConfig && delete f.msgConfig, C.error = h, C.errorText = k, C.errorCode = x, !i && s.onAudioMessage(C);
                break;
              case 5:
                !(C = {
                  id: y,
                  type: c,
                  contentsType: g[v.type],
                  from: M,
                  to: T,
                  url: v.remotePath && a.apiUrl + v.remotePath.substr(v.remotePath.indexOf("/", 9)),
                  secret: v.secretKey,
                  filename: v.displayName,
                  file_length: v.fileLength,
                  accessToken: s.token || "",
                  ext: b,
                  time: m,
                  msgConfig: f.msgConfig
                }).delay && delete C.delay, !C.msgConfig && delete f.msgConfig, C.error = h, C.errorText = k, C.errorCode = x, !i && s.onFileMessage(C);
                break;
              case 6:
                !(C = {
                  id: y,
                  contentsType: g[v.type],
                  from: M,
                  to: T,
                  action: v.action,
                  ext: b,
                  time: m,
                  msgConfig: f.msgConfig
                }).msgConfig && delete f.msgConfig, C.error = h, C.errorText = k, C.errorCode = x, !i && s.onCmdMessage(C);
                break;
              case 7:
                var N = "",
                  w = "";
                f.contents[0].customExts && (N = l(f.contents[0].customExts)), f.contents[0].params && (w = l(f.contents[0].params)), C = {
                  id: y,
                  contentsType: g[v.type],
                  from: M,
                  to: T,
                  customEvent: v.customEvent,
                  params: w,
                  customExts: N,
                  ext: b,
                  time: m
                }, !i && s.onCustomMessage(C)
            }
          } catch (V) {
            s.onError({
              type: n.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
              data: V
            })
          }
          if (!i && 1 === f.type && s.delivery && d(s, C, y), i || s.delivery) return C.message_type = c, C
        }
      },
      f = m;
    exports.default = f;
  }, {
    "long": "YA3p",
    "./sendChatMessage": "Aofe",
    "../status": "KLYY",
    "../checkEnv": "PkDd",
    "../message": "KTph",
    "../wx/utils": "a9jn",
    "../utils": "K0yk"
  }],
  "wnFo": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = n(require("long"));

    function n(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    var o = function (n, o, t) {
        var c = t.context.root.lookup("easemob.pb.MUCBody").decode(n.payload);
        new e.default(n.id.low, n.id.high, n.id.unsigned).toString();
        ! function (e) {
          var n = {
            type: "",
            owner: c.from.name,
            gid: c.mucId.name,
            from: c.from.name,
            fromJid: c.from,
            to: c.to.length ? c.to[0].name : "",
            toJid: c.to,
            chatroom: c.isChatroom,
            status: c.status
          };
          ({
            32: function () {
              n.type = c.isChatroom ? "rmChatRoomMute" : "rmGroupMute", t.onPresence(n)
            },
            31: function () {
              n.type = c.isChatroom ? "muteChatRoom" : "muteGroup", t.onPresence(n)
            },
            30: function () {
              n.type = c.isChatroom ? "rmUserFromChatRoomWhiteList" : "rmUserFromGroupWhiteList", t.onPresence(n)
            },
            29: function () {
              n.type = c.isChatroom ? "addUserToChatRoomWhiteList" : "addUserToGroupWhiteList", t.onPresence(n)
            },
            28: function () {
              n.type = "deleteFile", t.onPresence(n)
            },
            27: function () {
              n.type = "uploadFile", t.onPresence(n)
            },
            26: function () {
              n.type = "deleteAnnouncement", t.onPresence(n)
            },
            25: function () {
              n.type = "updateAnnouncement", t.onPresence(n)
            },
            24: function () {
              n.type = "removeMute", t.onPresence(n)
            },
            23: function () {
              n.type = "addMute", t.onPresence(n)
            },
            22: function () {
              n.type = "removeAdmin", t.onPresence(n)
            },
            21: function () {
              n.type = "addAdmin", t.onPresence(n)
            },
            20: function () {
              n.type = "changeOwner", t.onPresence(n)
            },
            19: function () {
              n.type = "direct_joined", t.onPresence(n)
            },
            18: function () {
              n.type = c.isChatroom ? "leaveChatRoom" : "leaveGroup", t.onPresence(n)
            },
            17: function () {
              n.type = c.isChatroom ? "memberJoinChatRoomSuccess" : "memberJoinPublicGroupSuccess", t.onPresence(n)
            },
            16: function () {
              n.type = "unblock", t.onPresence(n)
            },
            15: function () {
              n.type = "block", t.onPresence(n)
            },
            14: function () {
              n.type = "update", t.onPresence(n)
            },
            13: function () {
              n.type = "allow", n.reason = c.reason, t.onPresence(n)
            },
            12: function () {
              n.type = "ban", t.onPresence(n)
            },
            11: function () {
              n.type = "getBlackList", t.onPresence(n)
            },
            10: function () {
              n.type = "removedFromGroup", n.kicked = n.to, t.onPresence(n)
            },
            9: function () {
              n.type = "invite_decline", n.kicked = n.to, t.onPresence(n)
            },
            8: function () {
              n.type = "invite_accept", n.kicked = n.to, t.onPresence(n)
            },
            7: function () {
              n.type = "invite", n.kicked = n.to, t.onPresence(n)
            },
            6: function () {
              n.type = "joinPublicGroupDeclined", t.onPresence(n)
            },
            5: function () {
              n.type = "joinPublicGroupSuccess", t.onPresence(n)
            },
            4: function () {
              n.type = "joinGroupNotifications", n.reason = c.reason, t.onPresence(n)
            },
            3: function () {
              n.type = "leave", t.onPresence(n)
            },
            2: function () {
              n.type = "join", t.onPresence(n)
            },
            1: function () {
              n.type = "deleteGroupChat", t.onPresence(n)
            }
          } [e] || function () {
            console.log("%c没有匹配".concat(e, "类型"), "background: green")
          })()
        }(c.operation)
      },
      t = o;
    exports.default = t;
  }, {
    "long": "YA3p"
  }],
  "UOYe": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = o(require("long"));

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    var a = function (e, o, a) {
        var t = [],
          n = a.context.root.lookup("easemob.pb.RosterBody"),
          r = n.decode(t);
        "add" === o ? r.operation = 2 : "remove" === o ? r.operation = 3 : "accept" === o ? r.operation = 4 : "decline" === o ? r.operation = 5 : "ban" === o ? r.operation = 6 : "allow" === o && (r.operation = 7), r.from = a.context.jid;
        var s = [];
        if ("string" == typeof e.to) s.push({
          appKey: a.appKey || a.context.appKey,
          name: e.to,
          domain: "easemob.com"
        });
        else if (e.to instanceof Array)
          for (var c = 0; c < e.to.length; c++) s.push({
            appKey: a.appKey,
            name: e.to[c],
            domain: "easemob.com"
          });
        r.to = s, r.reason = e.message, r = n.encode(r).finish();
        var d = a.context.root.lookup("easemob.pb.Meta").decode(t);
        d.id = e.id || a.getUniqueId(), d.from = a.context.jid, d.to = {
          domain: "@easemob.com"
        }, d.ns = 3, d.payload = r;
        var i = a.context.root.lookup("easemob.pb.CommSyncUL"),
          p = i.decode(t);
        p.meta = d, p = i.encode(p).finish();
        var b = a.context.root.lookup("easemob.pb.MSync"),
          u = b.decode(t);
        u.version = a.version, u.encryptType = [0], u.command = 0, u.guid = a.jid, u.payload = p, u = b.encode(u).finish(), a.sendMSync(u)
      },
      t = function (o, a, t) {
        var n = t.context.root.lookup("easemob.pb.RosterBody").decode(o.payload),
          r = (new e.default(o.id.low, o.id.high, o.id.unsigned).toString(), {
            to: n.to[0].name,
            from: n.from.name,
            status: n.reason
          });
        switch (n.operation) {
          case 0:
            break;
          case 2:
            r.type = "subscribe";
            break;
          case 3:
            r.type = "unsubscribed";
            break;
          case 4:
            r.type = "subscribed";
            break;
          case 5:
            r.type = "unsubscribed";
            break;
          case 6:
          case 7:
            t.getBlacklist();
            break;
          case 8:
            r.type = "subscribed";
            break;
          case 9:
            r.type = "unsubscribed"
        }
        t.onPresence(r)
      },
      n = {
        handleMessage: t,
        operatRoster: a
      },
      r = n;
    exports.default = r;
  }, {
    "long": "YA3p"
  }],
  "pE/p": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = o(require("long")),
      t = o(require("../status"));

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    var r = (0, t.default)(),
      a = function (t, o, a) {
        var _ = a.context.root.lookup("easemob.pb.StatisticsBody").decode(t.payload);
        new e.default(t.id.low, t.id.high, t.id.unsigned).toString();
        switch (_.operation) {
          case 0:
            a.onStatisticMessage(_);
            break;
          case 1:
            var E = {
              type: r.WEBIM_CONNCTION_USER_REMOVED
            };
            a.logOut = !0, a.onError(E);
            break;
          case 2:
            E = {
              type: r.WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE
            };
            a.logOut = !0, a.onError(E);
            break;
          case 3:
            E = {
              type: r.WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD
            };
            a.logOut = !0, a.onError(E);
            break;
          case 4:
            E = {
              type: r.WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE
            };
            a.logOut = !0, a.onError(E)
        }
      },
      _ = a;
    exports.default = _;
  }, {
    "long": "YA3p",
    "../status": "KLYY"
  }],
  "wTgU": [function (require, module, exports) {
    ! function () {
      var e = "object" == typeof exports && null !== exports && "number" != typeof exports.nodeType ? exports : "undefined" != typeof self ? self : $.global,
        t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

      function r(e) {
        this.message = e
      }
      r.prototype = new Error, r.prototype.name = "InvalidCharacterError", e.btoa || (e.btoa = function (e) {
        for (var o, n, a = String(e), i = 0, c = t, f = ""; a.charAt(0 | i) || (c = "=", i % 1); f += c.charAt(63 & o >> 8 - i % 1 * 8)) {
          if ((n = a.charCodeAt(i += .75)) > 255) throw new r("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
          o = o << 8 | n
        }
        return f
      }), e.atob || (e.atob = function (e) {
        var o = String(e).replace(/[=]+$/, "");
        if (o.length % 4 == 1) throw new r("'atob' failed: The string to be decoded is not correctly encoded.");
        for (var n, a, i = 0, c = 0, f = ""; a = o.charAt(c++); ~a && (n = i % 4 ? 64 * n + a : a, i++ % 4) ? f += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0) a = t.indexOf(a);
        return f
      })
    }();
  }, {}],
  "np0Q": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e, t = a(require("./checkEnv")),
      r = a(require("./chat/handleChatMessage")),
      o = a(require("./status"));

    function a(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function s(e, t, r) {
      return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = r, e
    }
    var n, i = require("Base64"),
      p = (0, o.default)();
    n = t.default ? require("./wx/utils").default : require("./utils").default;
    var c = (s(e = {
        mr_cache: [],
        _fetchMessages: function (e, t) {
          var o = e.accessToken || t.context.accessToken;
          if (n.isCanSetRequestHeader)
            if (o) {
              var a = t.apiUrl,
                s = t.context.appName,
                c = t.context.orgName;
              if (!s || !c) return void t.onError({
                type: p.WEBIM_CONNCTION_AUTH_ERROR
              });
              if (!e.queue) return void t.onError({
                type: "",
                msg: "queue is not specified"
              });
              var u = e.queue,
                h = this.mr_cache[u] || (this.mr_cache[u] = {
                  msgs: []
                }),
                m = t.context.userId,
                l = -1;
              if (h.msgs.length >= e.count || h.is_last) return void("function" == typeof e.success && e.success(h));
              h && h.next_key && (l = h.next_key);
              var y = {
                  queue: u + (e.isGroup ? "@conference.easemob.com" : "@easemob.com"),
                  start: l,
                  end: -1
                },
                d = {
                  url: a + "/" + c + "/" + s + "/users/" + m + "/messageroaming",
                  dataType: "json",
                  type: "POST",
                  headers: {
                    Authorization: "Bearer " + o
                  },
                  data: JSON.stringify(y),
                  success: function (o, a) {
                    if (o && o.data) {
                      var s = o.data;
                      if (!o.data.msgs) return "function" == typeof e.success && e.success(h), h.is_last = !0, void(h.next_key = "");
                      var n = s.msgs,
                        p = n.length;
                      h.is_last = s.is_last, h.next_key = s.next_key;
                      var c = function (e) {
                        for (var o = [], a = 0, s = (e = i.atob(e)).length; a < s; ++a) o.push(e.charCodeAt(a));
                        var n = t.context.root.lookup("easemob.pb.Meta");
                        if (1 == (n = n.decode(o)).ns) return (0, r.default)(n, {
                          errorCode: 0,
                          reason: ""
                        }, t, !0)
                      };
                      try {
                        for (var u = 0; u < p; u++) {
                          var m = c(n[u].msg);
                          m && h.msgs.push(m)
                        }
                      } catch (l) {
                        console.log(l)
                      } finally {
                        "function" == typeof e.success && e.success(h)
                      }
                    }
                  } || n.emptyfn,
                  error: function (e, r) {
                    e.error && e.error_description && t.onError({
                      type: p.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
                      msg: e.error_description,
                      data: e
                    })
                  } || n.emptyfn
                };
              n.ajax(d)
            } else t.onError({
              type: p.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
            });
          else t.onError({
            type: p.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
          })
        },
        fetchHistoryMessages: function (e) {
          var t = this;
          if (e.queue) {
            var r = e.count || 20;
            ! function o() {
              t._fetchMessages({
                count: r,
                isGroup: !!e.isGroup,
                queue: e.queue,
                success: function (t) {
                  t.msgs.length >= r || t.is_last ? e.success && e.success(n.reverse(t.msgs.splice(0, r))) : o()
                },
                fail: function () {}
              }, t)
            }()
          } else t.onError({
            type: "",
            msg: "queue is not specified"
          })
        },
        pagingHistoryMessages: function (e) {
          var t = this,
            o = e.accessToken || t.context.accessToken;
          if (n.isCanSetRequestHeader)
            if (o) {
              var a = t.apiUrl,
                s = t.context.appName,
                c = t.context.orgName;
              if (!s || !c) return void t.onError({
                type: p.WEBIM_CONNCTION_AUTH_ERROR
              });
              if (!e.queue) return void t.onError({
                type: "",
                msg: "queue is not specified"
              });
              var u = e.queue,
                h = t.context.userId,
                m = {
                  queue: u + (e.isGroup ? "@conference.easemob.com" : "@easemob.com"),
                  start: e.start,
                  end: e.end
                },
                l = {
                  url: a + "/" + c + "/" + s + "/users/" + h + "/messageroaming",
                  dataType: "json",
                  type: "POST",
                  headers: {
                    Authorization: "Bearer " + o
                  },
                  data: JSON.stringify(m),
                  success: function (o, a) {
                    if (o && o.data) {
                      var s = o.data;
                      if (!o.data.msgs) return void("function" == typeof e.success && e.success({
                        msgs: []
                      }));
                      var n = s.msgs,
                        p = n.length,
                        c = function (e) {
                          for (var o = [], a = 0, s = (e = i.atob(e)).length; a < s; ++a) o.push(e.charCodeAt(a));
                          var n = t.context.root.lookup("easemob.pb.Meta");
                          if (1 == (n = n.decode(o)).ns) return (0, r.default)(n, {
                            errorCode: 0,
                            reason: ""
                          }, t, !0)
                        },
                        u = [];
                      try {
                        for (var h = 0; h < p; h++) {
                          var m = c(n[h].msg);
                          u.push(m)
                        }
                      } catch (l) {
                        console.log(l)
                      } finally {
                        "function" == typeof e.success && e.success(u)
                      }
                    }
                  } || n.emptyfn,
                  error: function (e, r) {
                    e.error && e.error_description && t.onError({
                      type: p.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
                      msg: e.error_description,
                      data: e
                    })
                  } || n.emptyfn
                };
              n.ajax(l)
            } else t.onError({
              type: p.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
            });
          else t.onError({
            type: p.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
          })
        },
        getChatRooms: function (e) {
          if (n.isCanSetRequestHeader) {
            var t = this,
              r = e.accessToken || this.context.accessToken;
            if (r) {
              var o = e.apiUrl,
                a = this.context.appName,
                s = this.context.orgName;
              if (!a || !s) return void t.onError({
                type: p.WEBIM_CONNCTION_AUTH_ERROR
              });
              var i = {
                url: o + "/" + s + "/" + a + "/chatrooms",
                dataType: "json",
                type: "GET",
                headers: {
                  Authorization: "Bearer " + r
                },
                data: {
                  pagenum: parseInt(e.pagenum) || 1,
                  pagesize: parseInt(e.pagesize) || 20
                },
                success: function (t, r) {
                  "function" == typeof e.success && e.success(t)
                } || n.emptyfn,
                error: function (e, r, o) {
                  e.error && e.error_description && t.onError({
                    type: p.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
                    msg: e.error_description,
                    data: e,
                    xhr: r
                  })
                } || n.emptyfn
              };
              n.ajax(i)
            } else t.onError({
              type: p.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
            })
          } else t.onError({
            type: p.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
          })
        },
        joinChatRoom: function (e) {
          e = e || {};
          if (n.isCanSetRequestHeader) {
            var t = this,
              r = e.accessToken || this.token;
            if (r) {
              var o = e.apiUrl || this.apiUrl,
                a = this.context.appName,
                s = this.context.orgName,
                i = e.roomId,
                c = e.message || "";
              if (!a || !s) return void t.onError({
                type: p.WEBIM_CONNCTION_AUTH_ERROR
              });
              var u = {
                url: o + "/" + s + "/" + a + "/chatrooms/" + i + "/apply",
                dataType: "json",
                type: "POST",
                data: JSON.stringify({
                  message: c
                }),
                headers: {
                  Authorization: "Bearer " + r,
                  "Content-Type": "application/json"
                },
                success: function (t, r) {
                  "function" == typeof e.success && e.success(t)
                } || n.emptyfn,
                error: function (t, r, o) {
                  "function" == typeof e.error && e.error(t)
                } || n.emptyfn
              };
              n.ajax(u)
            } else t.onError({
              type: p.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
            })
          } else t.onError({
            type: p.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
          })
        },
        quitChatRoom: function (e) {
          e = e || {};
          if (n.isCanSetRequestHeader) {
            var t = this,
              r = e.accessToken || this.token;
            if (r) {
              var o = e.apiUrl || this.apiUrl,
                a = this.context.appName,
                s = this.context.orgName,
                i = e.roomId;
              if (!a || !s) return void t.onError({
                type: p.WEBIM_CONNCTION_AUTH_ERROR
              });
              var c = {
                url: o + "/" + s + "/" + a + "/chatrooms/" + i + "/quit",
                dataType: "json",
                type: "DELETE",
                headers: {
                  Authorization: "Bearer " + r
                },
                success: function (t, r) {
                  "function" == typeof e.success && e.success(t)
                } || n.emptyfn,
                error: function (t, r, o) {
                  "function" == typeof e.error && e.error(t)
                } || n.emptyfn
              };
              n.ajax(c)
            } else t.onError({
              type: p.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
            })
          } else t.onError({
            type: p.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
          })
        },
        createGroupNew: function (e) {
          e.data.owner = this.user, e.data.invite_need_confirm = !1;
          var t = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(e.data),
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
          t.success = function (t) {
            e.success(t), this.onCreateGroup(t)
          }.bind(this), t.error = e.error || n.emptyfn, n.ajax(t)
        },
        blockGroup: function (e) {
          var t = e.groupId;
          t = "notification_ignore_" + t;
          var r = {
            entities: []
          };
          r.entities[0] = {}, r.entities[0][t] = !0;
          var o = {
            type: "PUT",
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/users/" + this.user,
            data: JSON.stringify(r),
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        listGroups: function (e) {
          var t = [];
          if (t.limit = e.limit, t.cursor = e.cursor, t.cursor || delete t.cursor, isNaN(e.limit)) throw 'The parameter "limit" should be a number';
          var r = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/publicchatgroups",
            type: "GET",
            dataType: "json",
            data: t,
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
          r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
        },
        getGroup: function (e) {
          var t = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/users/" + this.user + "/joined_chatgroups",
            dataType: "json",
            type: "GET",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
          t.success = e.success || n.emptyfn, t.error = e.error || n.emptyfn, n.ajax(t)
        },
        changeOwner: function (e) {
          var t = {
              newowner: e.newOwner
            },
            r = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + e.groupId,
              type: "PUT",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              },
              data: JSON.stringify(t)
            };
          r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
        },
        getGroupInfo: function (e) {
          var t = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + e.groupId + "?joined_time=true",
            type: "GET",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
          t.success = e.success || n.emptyfn, t.error = e.error || n.emptyfn, n.ajax(t)
        },
        modifyGroup: function (e) {
          var t = e.groupId,
            r = {
              groupname: e.groupName,
              description: e.description
            },
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t,
              type: "PUT",
              data: JSON.stringify(r),
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        listGroupMember: function (e) {
          if (isNaN(e.pageNum) || e.pageNum <= 0) throw 'The parameter "pageNum" should be a positive number';
          if (isNaN(e.pageSize) || e.pageSize <= 0) throw 'The parameter "pageSize" should be a positive number';
          if (null === e.groupId && void 0 === e.groupId) throw 'The parameter "groupId" should be added';
          var t = [],
            r = e.groupId;
          t.pagenum = e.pageNum, t.pagesize = e.pageSize;
          var o = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + r + "/users",
            dataType: "json",
            type: "GET",
            data: t,
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        getGroupAdmin: function (e) {
          var t = e.groupId,
            r = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/admin",
              dataType: "json",
              type: "GET",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
        },
        setAdmin: function (e) {
          var t = e.groupId,
            r = {
              newadmin: e.username
            },
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/admin",
              type: "POST",
              dataType: "json",
              data: JSON.stringify(r),
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        removeAdmin: function (e) {
          var t = e.groupId,
            r = e.username,
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/admin/" + r,
              type: "DELETE",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        dissolveGroup: function (e) {
          var t = e.groupId,
            r = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "?version=v3",
              type: "DELETE",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
        },
        quitGroup: function (e) {
          var t = e.groupId,
            r = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/quit",
              type: "DELETE",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
        },
        inviteToGroup: function (e) {
          var t = e.groupId,
            r = {
              usernames: e.users
            },
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/invite",
              type: "POST",
              data: JSON.stringify(r),
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        joinGroup: function (e) {
          var t = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + e.groupId + "/apply",
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
              message: "join group"
            }),
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
          t.success = e.success || n.emptyfn, t.error = e.error || n.emptyfn, n.ajax(t)
        },
        agreeJoinGroup: function (e) {
          var t = e.groupId,
            r = {
              applicant: e.applicant,
              verifyResult: !0,
              reason: "no clue"
            },
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/apply_verify",
              type: "POST",
              dataType: "json",
              data: JSON.stringify(r),
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        rejectJoinGroup: function (e) {
          var t = e.groupId,
            r = {
              applicant: e.applicant,
              verifyResult: !1,
              reason: "no clue"
            },
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/apply_verify",
              type: "POST",
              dataType: "json",
              data: JSON.stringify(r),
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        agreeInviteIntoGroup: function (e) {
          var t = e.groupId,
            r = {
              invitee: e.invitee,
              verifyResult: !0
            },
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/invite_verify",
              type: "POST",
              dataType: "json",
              data: JSON.stringify(r),
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        rejectInviteIntoGroup: function (e) {
          var t = e.groupId,
            r = {
              invitee: e.invitee,
              verifyResult: !1
            },
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/invite_verify",
              type: "POST",
              dataType: "json",
              data: JSON.stringify(r),
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        removeSingleGroupMember: function (e) {
          var t = e.groupId,
            r = e.username,
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/users/" + r,
              type: "DELETE",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        removeMultiGroupMember: function (e) {
          var t = e.groupId,
            r = e.users.join(","),
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/users/" + r,
              type: "DELETE",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        mute: function (e) {
          var t = e.groupId,
            r = {
              usernames: [e.username],
              mute_duration: e.muteDuration
            },
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/mute",
              dataType: "json",
              type: "POST",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              },
              data: JSON.stringify(r)
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        muteChatRoomMember: function (e) {
          var t = e.chatRoomId,
            r = {
              usernames: [e.username],
              mute_duration: e.muteDuration
            },
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/mute",
              dataType: "json",
              type: "POST",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              },
              data: JSON.stringify(r)
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        removeMute: function (e) {
          var t = e.groupId,
            r = e.username,
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/mute/" + r,
              dataType: "json",
              type: "DELETE",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        removeMuteChatRoomMember: function (e) {
          var t = e.chatRoomId,
            r = e.username,
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/mute/" + r,
              dataType: "json",
              type: "DELETE",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        getMuted: function (e) {
          var t = e.groupId,
            r = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/mute",
              dataType: "json",
              type: "GET",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
        },
        getChatRoomMuted: function (e) {
          var t = e.chatRoomId,
            r = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/mute",
              dataType: "json",
              type: "GET",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
        },
        groupBlockSingle: function (e) {
          var t = e.groupId,
            r = e.username,
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/blocks/users/" + r,
              type: "POST",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        chatRoomBlockSingle: function (e) {
          var t = e.chatRoomId,
            r = e.username,
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/blocks/users/" + r,
              type: "POST",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        groupBlockMulti: function (e) {
          var t = e.groupId,
            r = {
              usernames: e.usernames
            },
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/blocks/users",
              data: JSON.stringify(r),
              type: "POST",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        chatRoomBlockMulti: function (e) {
          var t = e.chatRoomId,
            r = {
              usernames: e.usernames
            },
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/blocks/users",
              data: JSON.stringify(r),
              type: "POST",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        removeGroupBlockSingle: function (e) {
          var t = e.groupId,
            r = e.username,
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/blocks/users/" + r,
              type: "DELETE",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        removeChatRoomBlockSingle: function (e) {
          var t = e.chatRoomId,
            r = e.username,
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/blocks/users/" + r,
              type: "DELETE",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        },
        removeGroupBlockMulti: function (e) {
          var t = e.groupId,
            r = e.username.join(","),
            o = {
              url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/blocks/users/" + r,
              type: "DELETE",
              dataType: "json",
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json"
              }
            };
          o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
        }
      }, "removeGroupBlockMulti", function (e) {
        var t = e.chatRoomId,
          r = e.username.join(","),
          o = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/blocks/users/" + r,
            type: "DELETE",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
      }), s(e, "getGroupBlacklistNew", function (e) {
        var t = e.groupId,
          r = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/blocks/users",
            type: "GET",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
      }), s(e, "getChatRoomBlacklistNew", function (e) {
        var t = e.chatRoomId,
          r = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/blocks/users",
            type: "GET",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
      }), s(e, "disableSendGroupMsg", function (e) {
        var t = e.groupId,
          r = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/ban",
            type: "POST",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
      }), s(e, "disableSendChatRoomMsg", function (e) {
        var t = e.chatRoomId,
          r = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/ban",
            type: "POST",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
      }), s(e, "enableSendGroupMsg", function (e) {
        var t = e.groupId,
          r = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/ban",
            type: "DELETE",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
      }), s(e, "enableSendChatRoomMsg", function (e) {
        var t = e.chatRoomId,
          r = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/ban",
            type: "DELETE",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
      }), s(e, "addUsersToGroupWhitelist", function (e) {
        var t = e.groupId,
          r = {
            usernames: e.users
          },
          o = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/white/users",
            type: "POST",
            data: JSON.stringify(r),
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
      }), s(e, "addUsersToChatRoomWhitelist", function (e) {
        var t = e.chatRoomId,
          r = {
            usernames: e.users
          },
          o = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/white/users",
            type: "POST",
            data: JSON.stringify(r),
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        o.success = e.success || n.emptyfn, o.error = e.error || n.emptyfn, n.ajax(o)
      }), s(e, "rmUsersFromGroupWhitelist", function (e) {
        var t = e.groupId,
          r = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/white/users/" + e.userName,
            type: "DELETE",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
      }), s(e, "rmUsersFromChatRoomWhitelist", function (e) {
        var t = e.chatRoomId,
          r = {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/white/users/" + e.userName,
            type: "DELETE",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
      }), s(e, "getGroupWhitelist", function (e) {
        var t = e.groupId,
          r = (e.users, {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/white/users",
            type: "GET",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          });
        r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
      }), s(e, "getChatRoomWhitelist", function (e) {
        var t = e.chatRoomId,
          r = (e.users, {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/white/users",
            type: "GET",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          });
        r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
      }), s(e, "isGroupWhiteUser", function (e) {
        var t = e.groupId,
          r = (e.users, {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + t + "/white/users/" + e.userName,
            type: "GET",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          });
        r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
      }), s(e, "isChatRoomWhiteUser", function (e) {
        var t = e.chatRoomId,
          r = (e.users, {
            url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatrooms/" + t + "/white/users/" + e.userName,
            type: "GET",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          });
        r.success = e.success || n.emptyfn, r.error = e.error || n.emptyfn, n.ajax(r)
      }), s(e, "getGroupMsgReadUser", function (e) {
        var t = this;
        e = e || {};
        if (n.isCanSetRequestHeader) {
          var r = e.accessToken || this.token;
          if (r) {
            var o = t.apiUrl,
              a = t.context.appName,
              s = t.context.orgName;
            if (!a || !s) return void t.onError({
              type: p.WEBIM_CONNCTION_AUTH_ERROR
            });
            var i = {
              url: o + "/" + s + "/" + a + "/chatgroups/" + e.groupId + "/acks/" + e.msgId,
              dataType: "json",
              type: "GET",
              data: {
                limit: 500,
                key: void 0
              },
              headers: {
                Authorization: "Bearer " + r
              },
              success: function (t) {
                "function" == typeof e.success && e.success(t)
              } || n.emptyfn,
              error: function (t) {
                "function" == typeof e.error && e.error(t)
              } || n.emptyfn
            };
            n.ajax(i)
          } else t.onError({
            type: p.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
          })
        } else conn.onError({
          type: p.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
        })
      }), s(e, "getBlacklist", function (e) {
        var t = this;
        e = e || {};
        if (n.isCanSetRequestHeader) {
          var r = this,
            o = e.accessToken || this.token;
          if (o) {
            var a = e.apiUrl || this.apiUrl,
              s = this.context.appName,
              i = this.context.orgName;
            if (!s || !i) return void r.onError({
              type: p.WEBIM_CONNCTION_AUTH_ERROR
            });
            var c = {
              url: a + "/" + i + "/" + s + "/users/" + this.user + "/blocks/users",
              dataType: "json",
              type: "GET",
              headers: {
                Authorization: "Bearer " + o
              },
              success: function (r, o) {
                var a = {};
                r.data.forEach(function (e, t) {
                  a[e] = {
                    name: e
                  }
                }), t.onBlacklistUpdate(a), "function" == typeof e.success && e.success(r)
              } || n.emptyfn,
              error: function (r, o, a) {
                t.onBlacklistUpdate([]), "function" == typeof e.error && e.error(r)
              } || n.emptyfn
            };
            n.ajax(c)
          } else r.onError({
            type: p.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
          })
        } else r.onError({
          type: p.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
        })
      }), s(e, "getRoster", function (e) {
        e = e || {};
        var t = this;
        if (n.isCanSetRequestHeader) {
          var r = this,
            o = e.accessToken || this.token;
          if (o) {
            var a = e.apiUrl || this.apiUrl,
              s = this.context.appName,
              i = this.context.orgName;
            if (!s || !i) return void r.onError({
              type: p.WEBIM_CONNCTION_AUTH_ERROR
            });
            var c = {
              url: a + "/" + i + "/" + s + "/users/" + this.user + "/contacts/users",
              dataType: "json",
              type: "GET",
              headers: {
                Authorization: "Bearer " + o
              },
              success: function (r, o) {
                var a = [];
                r.data.forEach(function (e, r) {
                  a.push({
                    name: e,
                    subscription: "both",
                    jid: t.context.jid
                  })
                }), "function" == typeof e.success && e.success(a), t.onRoster && t.onRoster(a)
              } || n.emptyfn,
              error: function (t, r, o) {
                "function" == typeof e.error && e.error(t)
              } || n.emptyfn
            };
            n.ajax(c)
          } else r.onError({
            type: p.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
          })
        } else r.onError({
          type: p.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
        })
      }), s(e, "fetchGroupAnnouncement", function (e) {
        var t = e.apiUrl || this.apiUrl,
          r = this.context.appName,
          o = this.context.orgName,
          a = e.groupId,
          s = {
            url: "".concat(t, "/").concat(o, "/").concat(r, "/chatgroups/").concat(a, "/announcement"),
            type: "GET",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        s.success = e.success || n.emptyfn, s.error = e.error || n.emptyfn, n.ajax(s)
      }), s(e, "fetchChatRoomAnnouncement", function (e) {
        var t = e.apiUrl || this.apiUrl,
          r = this.context.appName,
          o = this.context.orgName,
          a = e.roomId,
          s = {
            url: "".concat(t, "/").concat(o, "/").concat(r, "/chatrooms/").concat(a, "/announcement"),
            type: "GET",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        s.success = e.success || n.emptyfn, s.error = e.error || n.emptyfn, n.ajax(s)
      }), s(e, "updateGroupAnnouncement", function (e) {
        var t = e.apiUrl || this.apiUrl,
          r = this.context.appName,
          o = this.context.orgName,
          a = e.groupId,
          s = {
            announcement: e.announcement
          },
          i = {
            url: "".concat(t, "/").concat(o, "/").concat(r, "/chatgroups/").concat(a, "/announcement"),
            type: "POST",
            dataType: "json",
            data: JSON.stringify(s),
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        i.success = e.success || n.emptyfn, i.error = e.error || n.emptyfn, n.ajax(i)
      }), s(e, "updateChatRoomAnnouncement", function (e) {
        var t = e.apiUrl || this.apiUrl,
          r = this.context.appName,
          o = this.context.orgName,
          a = e.roomId,
          s = {
            announcement: e.announcement
          },
          i = {
            url: "".concat(t, "/").concat(o, "/").concat(r, "/chatrooms/").concat(a, "/announcement"),
            type: "POST",
            dataType: "json",
            data: JSON.stringify(s),
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        i.success = e.success || n.emptyfn, i.error = e.error || n.emptyfn, n.ajax(i)
      }), s(e, "uploadGroupSharedFile", function (e) {
        var t = e.apiUrl || this.apiUrl,
          r = this.context.appName,
          o = this.context.orgName,
          a = e.groupId;
        n.uploadFile({
          uploadUrl: "".concat(t, "/").concat(o, "/").concat(r, "/chatgroups/").concat(a, "/share_files"),
          onFileUploadProgress: e.onFileUploadProgress,
          onFileUploadComplete: e.onFileUploadComplete,
          onFileUploadError: e.onFileUploadError,
          onFileUploadCanceled: e.onFileUploadCanceled,
          accessToken: this.token,
          apiUrl: t,
          file: e.file,
          appKey: this.context.appKey
        })
      }), s(e, "uploadChatRoomSharedFile", function (e) {
        var t = e.apiUrl || this.apiUrl,
          r = this.context.appName,
          o = this.context.orgName,
          a = e.roomId;
        n.uploadFile({
          uploadUrl: "".concat(t, "/").concat(o, "/").concat(r, "/chatrooms/").concat(a, "/share_files"),
          onFileUploadProgress: e.onFileUploadProgress,
          onFileUploadComplete: e.onFileUploadComplete,
          onFileUploadError: e.onFileUploadError,
          onFileUploadCanceled: e.onFileUploadCanceled,
          accessToken: this.token,
          apiUrl: t,
          file: e.file,
          appKey: this.context.appKey
        })
      }), s(e, "deleteGroupSharedFile", function (e) {
        var t = e.apiUrl || this.apiUrl,
          r = this.context.appName,
          o = this.context.orgName,
          a = e.groupId,
          s = e.fileId,
          i = {
            url: "".concat(t, "/").concat(o, "/").concat(r, "/chatgroups/").concat(a, "/share_files/").concat(s),
            type: "DELETE",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        i.success = e.success || n.emptyfn, i.error = e.error || n.emptyfn, n.ajax(i)
      }), s(e, "deleteChatRoomSharedFile", function (e) {
        var t = e.apiUrl || this.apiUrl,
          r = this.context.appName,
          o = this.context.orgName,
          a = e.roomId,
          s = e.fileId,
          i = {
            url: "".concat(t, "/").concat(o, "/").concat(r, "/chatrooms/").concat(a, "/share_files/").concat(s),
            type: "DELETE",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        i.success = e.success || n.emptyfn, i.error = e.error || n.emptyfn, n.ajax(i)
      }), s(e, "downloadGroupSharedFile", function (e) {
        var t = e.apiUrl || this.apiUrl,
          r = this.context.appName,
          o = this.context.orgName,
          a = e.groupId,
          s = e.fileId;
        n.download.call(this, {
          url: "".concat(t, "/").concat(o, "/").concat(r, "/chatgroups/").concat(a, "/share_files/").concat(s),
          onFileDownloadComplete: e.onFileDownloadComplete,
          onFileDownloadError: e.onFileDownloadError,
          accessToken: this.token,
          id: s,
          secret: ""
        })
      }), s(e, "downloadChatRoomSharedFile", function (e) {
        var t = e.apiUrl || this.apiUrl,
          r = this.context.appName,
          o = this.context.orgName,
          a = e.roomId,
          s = e.fileId;
        n.download.call(this, {
          url: "".concat(t, "/").concat(o, "/").concat(r, "/chatrooms/").concat(a, "/share_files/").concat(s),
          onFileDownloadComplete: e.onFileDownloadComplete,
          onFileDownloadError: e.onFileDownloadError,
          accessToken: this.token,
          id: s,
          secret: ""
        })
      }), s(e, "fetchGroupSharedFileList", function (e) {
        var t = e.apiUrl || this.apiUrl,
          r = this.context.appName,
          o = this.context.orgName,
          a = e.groupId,
          s = {
            url: "".concat(t, "/").concat(o, "/").concat(r, "/chatgroups/").concat(a, "/share_files"),
            type: "GET",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        s.success = e.success || n.emptyfn, s.error = e.error || n.emptyfn, n.ajax(s)
      }), s(e, "fetchChatRoomSharedFileList", function (e) {
        var t = e.apiUrl || this.apiUrl,
          r = this.context.appName,
          o = this.context.orgName,
          a = e.roomId,
          s = {
            url: "".concat(t, "/").concat(o, "/").concat(r, "/chatrooms/").concat(a, "/share_files"),
            type: "GET",
            dataType: "json",
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json"
            }
          };
        s.success = e.success || n.emptyfn, s.error = e.error || n.emptyfn, n.ajax(s)
      }), e),
      u = c;
    exports.default = u;
  }, {
    "./checkEnv": "PkDd",
    "./chat/handleChatMessage": "TvlR",
    "./status": "KLYY",
    "Base64": "wTgU",
    "./wx/utils": "a9jn",
    "./utils": "K0yk"
  }],
  "Inpi": [function (require, module, exports) {
    module.exports = {};
  }, {}],
  "n7JO": [function (require, module, exports) {
    function t(t, i) {
      this.lo = t >>> 0, this.hi = i >>> 0
    }
    module.exports = t;
    var i = t.zero = new t(0, 0);
    i.toNumber = function () {
      return 0
    }, i.zzEncode = i.zzDecode = function () {
      return this
    }, i.length = function () {
      return 1
    };
    var o = t.zeroHash = "\0\0\0\0\0\0\0\0";
    t.fromNumber = function (o) {
      if (0 === o) return i;
      var h = o < 0;
      h && (o = -o);
      var r = o >>> 0,
        n = (o - r) / 4294967296 >>> 0;
      return h && (n = ~n >>> 0, r = ~r >>> 0, ++r > 4294967295 && (r = 0, ++n > 4294967295 && (n = 0))), new t(r, n)
    }, t.from = function (o) {
      return "number" == typeof o ? t.fromNumber(o) : "string" == typeof o || o instanceof String ? t.fromNumber(parseInt(o, 10)) : o.low || o.high ? new t(o.low >>> 0, o.high >>> 0) : i
    }, t.prototype.toNumber = function (t) {
      if (!t && this.hi >>> 31) {
        var i = 1 + ~this.lo >>> 0,
          o = ~this.hi >>> 0;
        return i || (o = o + 1 >>> 0), -(i + 4294967296 * o)
      }
      return this.lo + 4294967296 * this.hi
    }, t.prototype.toLong = function (t) {
      return {
        low: 0 | this.lo,
        high: 0 | this.hi,
        unsigned: Boolean(t)
      }
    };
    var h = String.prototype.charCodeAt;
    t.fromHash = function (r) {
      return r === o ? i : new t((h.call(r, 0) | h.call(r, 1) << 8 | h.call(r, 2) << 16 | h.call(r, 3) << 24) >>> 0, (h.call(r, 4) | h.call(r, 5) << 8 | h.call(r, 6) << 16 | h.call(r, 7) << 24) >>> 0)
    }, t.prototype.toHash = function () {
      return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24)
    }, t.prototype.zzEncode = function () {
      var t = this.hi >> 31;
      return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ t) >>> 0, this.lo = (this.lo << 1 ^ t) >>> 0, this
    }, t.prototype.zzDecode = function () {
      var t = -(1 & this.lo);
      return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ t) >>> 0, this.hi = (this.hi >>> 1 ^ t) >>> 0, this
    }, t.prototype.length = function () {
      var t = this.lo,
        i = (this.lo >>> 28 | this.hi << 4) >>> 0,
        o = this.hi >>> 24;
      return 0 === o ? 0 === i ? t < 16384 ? t < 128 ? 1 : 2 : t < 2097152 ? 3 : 4 : i < 16384 ? i < 128 ? 5 : 6 : i < 2097152 ? 7 : 8 : o < 128 ? 9 : 10
    };
  }, {}],
  "8kOt": [function (require, module, exports) {
    function r(r, n, u) {
      var t = u || 8192,
        e = t >>> 1,
        l = null,
        o = t;
      return function (u) {
        if (u < 1 || u > e) return r(u);
        o + u > t && (l = r(t), o = 0);
        var a = n.call(l, o, o += u);
        return 7 & o && (o = 1 + (7 | o)), a
      }
    }
    module.exports = r;
  }, {}],
  "Hofe": [function (require, module, exports) {
    function n(n) {
      return "undefined" != typeof Float32Array ? function () {
        var e = new Float32Array([-0]),
          t = new Uint8Array(e.buffer),
          r = 128 === t[3];

        function o(n, r, o) {
          e[0] = n, r[o] = t[0], r[o + 1] = t[1], r[o + 2] = t[2], r[o + 3] = t[3]
        }

        function u(n, r, o) {
          e[0] = n, r[o] = t[3], r[o + 1] = t[2], r[o + 2] = t[1], r[o + 3] = t[0]
        }

        function a(n, r) {
          return t[0] = n[r], t[1] = n[r + 1], t[2] = n[r + 2], t[3] = n[r + 3], e[0]
        }

        function i(n, r) {
          return t[3] = n[r], t[2] = n[r + 1], t[1] = n[r + 2], t[0] = n[r + 3], e[0]
        }
        n.writeFloatLE = r ? o : u, n.writeFloatBE = r ? u : o, n.readFloatLE = r ? a : i, n.readFloatBE = r ? i : a
      }() : function () {
        function u(n, e, t, r) {
          var o = e < 0 ? 1 : 0;
          if (o && (e = -e), 0 === e) n(1 / e > 0 ? 0 : 2147483648, t, r);
          else if (isNaN(e)) n(2143289344, t, r);
          else if (e > 3.4028234663852886e38) n((o << 31 | 2139095040) >>> 0, t, r);
          else if (e < 1.1754943508222875e-38) n((o << 31 | Math.round(e / 1.401298464324817e-45)) >>> 0, t, r);
          else {
            var u = Math.floor(Math.log(e) / Math.LN2);
            n((o << 31 | u + 127 << 23 | 8388607 & Math.round(e * Math.pow(2, -u) * 8388608)) >>> 0, t, r)
          }
        }

        function a(n, e, t) {
          var r = n(e, t),
            o = 2 * (r >> 31) + 1,
            u = r >>> 23 & 255,
            a = 8388607 & r;
          return 255 === u ? a ? NaN : o * (1 / 0) : 0 === u ? 1.401298464324817e-45 * o * a : o * Math.pow(2, u - 150) * (a + 8388608)
        }
        n.writeFloatLE = u.bind(null, e), n.writeFloatBE = u.bind(null, t), n.readFloatLE = a.bind(null, r), n.readFloatBE = a.bind(null, o)
      }(), "undefined" != typeof Float64Array ? function () {
        var e = new Float64Array([-0]),
          t = new Uint8Array(e.buffer),
          r = 128 === t[7];

        function o(n, r, o) {
          e[0] = n, r[o] = t[0], r[o + 1] = t[1], r[o + 2] = t[2], r[o + 3] = t[3], r[o + 4] = t[4], r[o + 5] = t[5], r[o + 6] = t[6], r[o + 7] = t[7]
        }

        function u(n, r, o) {
          e[0] = n, r[o] = t[7], r[o + 1] = t[6], r[o + 2] = t[5], r[o + 3] = t[4], r[o + 4] = t[3], r[o + 5] = t[2], r[o + 6] = t[1], r[o + 7] = t[0]
        }

        function a(n, r) {
          return t[0] = n[r], t[1] = n[r + 1], t[2] = n[r + 2], t[3] = n[r + 3], t[4] = n[r + 4], t[5] = n[r + 5], t[6] = n[r + 6], t[7] = n[r + 7], e[0]
        }

        function i(n, r) {
          return t[7] = n[r], t[6] = n[r + 1], t[5] = n[r + 2], t[4] = n[r + 3], t[3] = n[r + 4], t[2] = n[r + 5], t[1] = n[r + 6], t[0] = n[r + 7], e[0]
        }
        n.writeDoubleLE = r ? o : u, n.writeDoubleBE = r ? u : o, n.readDoubleLE = r ? a : i, n.readDoubleBE = r ? i : a
      }() : function () {
        function u(n, e, t, r, o, u) {
          var a = r < 0 ? 1 : 0;
          if (a && (r = -r), 0 === r) n(0, o, u + e), n(1 / r > 0 ? 0 : 2147483648, o, u + t);
          else if (isNaN(r)) n(0, o, u + e), n(2146959360, o, u + t);
          else if (r > 1.7976931348623157e308) n(0, o, u + e), n((a << 31 | 2146435072) >>> 0, o, u + t);
          else {
            var i;
            if (r < 2.2250738585072014e-308) n((i = r / 5e-324) >>> 0, o, u + e), n((a << 31 | i / 4294967296) >>> 0, o, u + t);
            else {
              var l = Math.floor(Math.log(r) / Math.LN2);
              1024 === l && (l = 1023), n(4503599627370496 * (i = r * Math.pow(2, -l)) >>> 0, o, u + e), n((a << 31 | l + 1023 << 20 | 1048576 * i & 1048575) >>> 0, o, u + t)
            }
          }
        }

        function a(n, e, t, r, o) {
          var u = n(r, o + e),
            a = n(r, o + t),
            i = 2 * (a >> 31) + 1,
            l = a >>> 20 & 2047,
            f = 4294967296 * (1048575 & a) + u;
          return 2047 === l ? f ? NaN : i * (1 / 0) : 0 === l ? 5e-324 * i * f : i * Math.pow(2, l - 1075) * (f + 4503599627370496)
        }
        n.writeDoubleLE = u.bind(null, e, 0, 4), n.writeDoubleBE = u.bind(null, t, 4, 0), n.readDoubleLE = a.bind(null, r, 0, 4), n.readDoubleBE = a.bind(null, o, 4, 0)
      }(), n
    }

    function e(n, e, t) {
      e[t] = 255 & n, e[t + 1] = n >>> 8 & 255, e[t + 2] = n >>> 16 & 255, e[t + 3] = n >>> 24
    }

    function t(n, e, t) {
      e[t] = n >>> 24, e[t + 1] = n >>> 16 & 255, e[t + 2] = n >>> 8 & 255, e[t + 3] = 255 & n
    }

    function r(n, e) {
      return (n[e] | n[e + 1] << 8 | n[e + 2] << 16 | n[e + 3] << 24) >>> 0
    }

    function o(n, e) {
      return (n[e] << 24 | n[e + 1] << 16 | n[e + 2] << 8 | n[e + 3]) >>> 0
    }
    module.exports = n(n);
  }, {}],
  "Gmhw": [function (require, module, exports) {
    "use strict";

    function n(n, e) {
      for (var r = new Array(arguments.length - 1), t = 0, l = 2, o = !0; l < arguments.length;) r[t++] = arguments[l++];
      return new Promise(function (l, u) {
        r[t] = function (n) {
          if (o)
            if (o = !1, n) u(n);
            else {
              for (var e = new Array(arguments.length - 1), r = 0; r < e.length;) e[r++] = arguments[r];
              l.apply(null, e)
            }
        };
        try {
          n.apply(e || null, r)
        } catch (a) {
          o && (o = !1, u(a))
        }
      })
    }
    module.exports = n;
  }, {}],
  "fTab": [function (require, module, exports) {
    "use strict";

    function t() {
      this._listeners = {}
    }
    module.exports = t, t.prototype.on = function (t, s, e) {
      return (this._listeners[t] || (this._listeners[t] = [])).push({
        fn: s,
        ctx: e || this
      }), this
    }, t.prototype.off = function (t, s) {
      if (void 0 === t) this._listeners = {};
      else if (void 0 === s) this._listeners[t] = [];
      else
        for (var e = this._listeners[t], i = 0; i < e.length;) e[i].fn === s ? e.splice(i, 1) : ++i;
      return this
    }, t.prototype.emit = function (t) {
      var s = this._listeners[t];
      if (s) {
        for (var e = [], i = 1; i < arguments.length;) e.push(arguments[i++]);
        for (i = 0; i < s.length;) s[i].fn.apply(s[i++].ctx, e)
      }
      return this
    };
  }, {}],
  "9xCK": [function (require, module, exports) {
    var e = module.exports,
      r = e.isAbsolute = function (e) {
        return /^(?:\/|\w+:)/.test(e)
      },
      t = e.normalize = function (e) {
        var t = (e = e.replace(/\\/g, "/").replace(/\/{2,}/g, "/")).split("/"),
          l = r(e),
          n = "";
        l && (n = t.shift() + "/");
        for (var i = 0; i < t.length;) ".." === t[i] ? i > 0 && ".." !== t[i - 1] ? t.splice(--i, 2) : l ? t.splice(i, 1) : ++i : "." === t[i] ? t.splice(i, 1) : ++i;
        return n + t.join("/")
      };
    e.resolve = function (e, l, n) {
      return n || (l = t(l)), r(l) ? l : (n || (e = t(e)), (e = e.replace(/(?:\/|^)[^\/]+$/, "")).length ? t(e + "/" + l) : l)
    };
  }, {}],
  "lxH0": [function (require, module, exports) {
    "use strict";
    var r = module.exports;
    r.length = function (r) {
      var e = r.length;
      if (!e) return 0;
      for (var a = 0; --e % 4 > 1 && "=" === r.charAt(e);) ++a;
      return Math.ceil(3 * r.length) / 4 - a
    };
    for (var e = new Array(64), a = new Array(123), t = 0; t < 64;) a[e[t] = t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : t - 59 | 43] = t++;
    r.encode = function (r, a, t) {
      for (var n, o = null, i = [], c = 0, s = 0; a < t;) {
        var h = r[a++];
        switch (s) {
          case 0:
            i[c++] = e[h >> 2], n = (3 & h) << 4, s = 1;
            break;
          case 1:
            i[c++] = e[n | h >> 4], n = (15 & h) << 2, s = 2;
            break;
          case 2:
            i[c++] = e[n | h >> 6], i[c++] = e[63 & h], s = 0
        }
        c > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, i)), c = 0)
      }
      return s && (i[c++] = e[n], i[c++] = 61, 1 === s && (i[c++] = 61)), o ? (c && o.push(String.fromCharCode.apply(String, i.slice(0, c))), o.join("")) : String.fromCharCode.apply(String, i.slice(0, c))
    };
    var n = "invalid encoding";
    r.decode = function (r, e, t) {
      for (var o, i = t, c = 0, s = 0; s < r.length;) {
        var h = r.charCodeAt(s++);
        if (61 === h && c > 1) break;
        if (void 0 === (h = a[h])) throw Error(n);
        switch (c) {
          case 0:
            o = h, c = 1;
            break;
          case 1:
            e[t++] = o << 2 | (48 & h) >> 4, o = h, c = 2;
            break;
          case 2:
            e[t++] = (15 & o) << 4 | (60 & h) >> 2, o = h, c = 3;
            break;
          case 3:
            e[t++] = (3 & o) << 6 | h, c = 0
        }
      }
      if (1 === c) throw Error(n);
      return t - i
    }, r.test = function (r) {
      return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(r)
    };
  }, {}],
  "DDeL": [function (require, module, exports) {
    "use strict";
    var r = module.exports;
    r.length = function (r) {
      for (var t = 0, e = 0, n = 0; n < r.length; ++n)(e = r.charCodeAt(n)) < 128 ? t += 1 : e < 2048 ? t += 2 : 55296 == (64512 & e) && 56320 == (64512 & r.charCodeAt(n + 1)) ? (++n, t += 4) : t += 3;
      return t
    }, r.read = function (r, t, e) {
      if (e - t < 1) return "";
      for (var n, o = null, a = [], i = 0; t < e;)(n = r[t++]) < 128 ? a[i++] = n : n > 191 && n < 224 ? a[i++] = (31 & n) << 6 | 63 & r[t++] : n > 239 && n < 365 ? (n = ((7 & n) << 18 | (63 & r[t++]) << 12 | (63 & r[t++]) << 6 | 63 & r[t++]) - 65536, a[i++] = 55296 + (n >> 10), a[i++] = 56320 + (1023 & n)) : a[i++] = (15 & n) << 12 | (63 & r[t++]) << 6 | 63 & r[t++], i > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, a)), i = 0);
      return o ? (i && o.push(String.fromCharCode.apply(String, a.slice(0, i))), o.join("")) : String.fromCharCode.apply(String, a.slice(0, i))
    }, r.write = function (r, t, e) {
      for (var n, o, a = e, i = 0; i < r.length; ++i)(n = r.charCodeAt(i)) < 128 ? t[e++] = n : n < 2048 ? (t[e++] = n >> 6 | 192, t[e++] = 63 & n | 128) : 55296 == (64512 & n) && 56320 == (64512 & (o = r.charCodeAt(i + 1))) ? (n = 65536 + ((1023 & n) << 10) + (1023 & o), ++i, t[e++] = n >> 18 | 240, t[e++] = n >> 12 & 63 | 128, t[e++] = n >> 6 & 63 | 128, t[e++] = 63 & n | 128) : (t[e++] = n >> 12 | 224, t[e++] = n >> 6 & 63 | 128, t[e++] = 63 & n | 128);
      return e - a
    };
  }, {}],
  "IUvN": [function (require, module, exports) {
    function e(t) {
      return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(t)
    }
    module.exports = s;
    var t = require("./object");
    ((s.prototype = Object.create(t.prototype)).constructor = s).className = "Enum";
    var r = require("./namespace");

    function s(r, s, i, o, n) {
      if (t.call(this, r, i), s && "object" !== e(s)) throw TypeError("values must be an object");
      if (this.valuesById = {}, this.values = Object.create(this.valuesById), this.comment = o, this.comments = n || {}, this.reserved = void 0, s)
        for (var u = Object.keys(s), a = 0; a < u.length; ++a) "number" == typeof s[u[a]] && (this.valuesById[this.values[u[a]] = s[u[a]]] = u[a])
    }
    s.fromJSON = function (e, t) {
      var r = new s(e, t.values, t.options, t.comment, t.comments);
      return r.reserved = t.reserved, r
    }, s.prototype.toJSON = function (e) {
      var t = !!e && Boolean(e.keepComments);
      return util.toObject(["options", this.options, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "comment", t ? this.comment : void 0, "comments", t ? this.comments : void 0])
    }, s.prototype.add = function (e, t, r) {
      if (!util.isString(e)) throw TypeError("name must be a string");
      if (!util.isInteger(t)) throw TypeError("id must be an integer");
      if (void 0 !== this.values[e]) throw Error("duplicate name '" + e + "' in " + this);
      if (this.isReservedId(t)) throw Error("id " + t + " is reserved in " + this);
      if (this.isReservedName(e)) throw Error("name '" + e + "' is reserved in " + this);
      if (void 0 !== this.valuesById[t]) {
        if (!this.options || !this.options.allow_alias) throw Error("duplicate id " + t + " in " + this);
        this.values[e] = t
      } else this.valuesById[this.values[e] = t] = e;
      return this.comments[e] = r || null, this
    }, s.prototype.remove = function (e) {
      if (!util.isString(e)) throw TypeError("name must be a string");
      var t = this.values[e];
      if (null == t) throw Error("name '" + e + "' does not exist in " + this);
      return delete this.valuesById[t], delete this.values[e], delete this.comments[e], this
    }, s.prototype.isReservedId = function (e) {
      return r.isReservedId(this.reserved, e)
    }, s.prototype.isReservedName = function (e) {
      return r.isReservedName(this.reserved, e)
    };
  }, {
    "./object": "rb45",
    "./namespace": "C9/l"
  }],
  "K1j0": [function (require, module, exports) {
    "use strict";
    var e = module.exports,
      i = require("./util"),
      t = ["double", "float", "int32", "uint32", "sint32", "fixed32", "sfixed32", "int64", "uint64", "sint64", "fixed64", "sfixed64", "bool", "string", "bytes"];

    function n(e, i) {
      var n = 0,
        r = {};
      for (i |= 0; n < e.length;) r[t[n + i]] = e[n++];
      return r
    }
    e.basic = n([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2, 2]), e.defaults = n([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, !1, "", i.emptyArray, null]), e.long = n([0, 0, 0, 1, 1], 7), e.mapKey = n([0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2], 2), e.packed = n([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0]), e._configure = function () {
      i = require("./util")
    };
  }, {
    "./util": "HQWY"
  }],
  "ixQC": [function (require, module, exports) {
    function t(e) {
      return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(e)
    }
    module.exports = p;
    var e, i, o, s, r = require("./object");
    ((p.prototype = Object.create(r.prototype)).constructor = p).className = "Field";
    var n = /^required|optional|repeated$/;

    function p(t, e, s, p, l, u, a) {
      if (o.isObject(p) ? (a = l, u = p, p = l = void 0) : o.isObject(l) && (a = u, u = l, l = void 0), r.call(this, t, u), !o.isInteger(e) || e < 0) throw TypeError("id must be a non-negative integer");
      if (!o.isString(s)) throw TypeError("type must be a string");
      if (void 0 !== p && !n.test(p = p.toString().toLowerCase())) throw TypeError("rule must be a string rule");
      if (void 0 !== l && !o.isString(l)) throw TypeError("extend must be a string");
      this.rule = p && "optional" !== p ? p : void 0, this.type = s, this.id = e, this.extend = l || void 0, this.required = "required" === p, this.optional = !this.required, this.repeated = "repeated" === p, this.map = !1, this.message = null, this.partOf = null, this.typeDefault = null, this.defaultValue = null, this.long = !!o.Long && void 0 !== i.long[s], this.bytes = "bytes" === s, this.resolvedType = null, this.extensionField = null, this.declaringField = null, this._packed = null, this.comment = a
    }
    p.fromJSON = function (t, e) {
      return new p(t, e.id, e.type, e.rule, e.extend, e.options, e.comment)
    }, Object.defineProperty(p.prototype, "packed", {
      get: function () {
        return null === this._packed && (this._packed = !1 !== this.getOption("packed")), this._packed
      }
    }), p.prototype.setOption = function (t, e, i) {
      return "packed" === t && (this._packed = null), r.prototype.setOption.call(this, t, e, i)
    }, p.prototype.toJSON = function (t) {
      var e = !!t && Boolean(t.keepComments);
      return o.toObject(["rule", "optional" !== this.rule && this.rule || void 0, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", e ? this.comment : void 0])
    }, p.prototype.resolve = function () {
      if (this.resolved) return this;
      if (void 0 === (this.typeDefault = i.defaults[this.type]) && (this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type), this.resolvedType instanceof s ? this.typeDefault = null : this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]), this.options && null != this.options.default && (this.typeDefault = this.options.default, this.resolvedType instanceof e && "string" == typeof this.typeDefault && (this.typeDefault = this.resolvedType.values[this.typeDefault])), this.options && (!0 !== this.options.packed && (void 0 === this.options.packed || !this.resolvedType || this.resolvedType instanceof e) || delete this.options.packed, Object.keys(this.options).length || (this.options = void 0)), this.long) this.typeDefault = o.Long.fromNumber(this.typeDefault, "u" === this.type.charAt(0)), Object.freeze && Object.freeze(this.typeDefault);
      else if (this.bytes && "string" == typeof this.typeDefault) {
        var t;
        o.utf8.write(this.typeDefault, t = o.newBuffer(o.utf8.length(this.typeDefault)), 0), this.typeDefault = t
      }
      return this.map ? this.defaultValue = o.emptyObject : this.repeated ? this.defaultValue = o.emptyArray : this.defaultValue = this.typeDefault, this.parent instanceof s && (this.parent.ctor.prototype[this.name] = this.defaultValue), r.prototype.resolve.call(this)
    }, p.d = function (e, i, s, r) {
      return "function" == typeof i ? i = o.decorateType(i).name : i && "object" === t(i) && (i = o.decorateEnum(i).name),
        function (t, n) {
          o.decorateType(t.constructor).add(new p(n, e, i, s, {
            default: r
          }))
        }
    }, p._configure = function () {
      s = require("./type"), e = require("./enum"), i = require("./types"), o = require("./util")
    };
  }, {
    "./object": "rb45",
    "./type": "EOlb",
    "./enum": "IUvN",
    "./types": "K1j0",
    "./util": "HQWY"
  }],
  "ZsNy": [function (require, module, exports) {
    module.exports = o;
    var e, t, r = require("./object");

    function o(e, t, o, n) {
      if (Array.isArray(t) || (o = t, t = void 0), r.call(this, e, o), void 0 !== t && !Array.isArray(t)) throw TypeError("fieldNames must be an Array");
      this.oneof = t || [], this.fieldsArray = [], this.comment = n
    }

    function n(e) {
      if (e.parent)
        for (var t = 0; t < e.fieldsArray.length; ++t) e.fieldsArray[t].parent || e.parent.add(e.fieldsArray[t])
    }((o.prototype = Object.create(r.prototype)).constructor = o).className = "OneOf", o.fromJSON = function (e, t) {
      return new o(e, t.oneof, t.options, t.comment)
    }, o.prototype.toJSON = function (e) {
      var r = !!e && Boolean(e.keepComments);
      return t.toObject(["options", this.options, "oneof", this.oneof, "comment", r ? this.comment : void 0])
    }, o.prototype.add = function (t) {
      if (!(t instanceof e)) throw TypeError("field must be a Field");
      return t.parent && t.parent !== this.parent && t.parent.remove(t), this.oneof.push(t.name), this.fieldsArray.push(t), t.partOf = this, n(this), this
    }, o.prototype.remove = function (t) {
      if (!(t instanceof e)) throw TypeError("field must be a Field");
      var r = this.fieldsArray.indexOf(t);
      if (r < 0) throw Error(t + " is not a member of " + this);
      return this.fieldsArray.splice(r, 1), (r = this.oneof.indexOf(t.name)) > -1 && this.oneof.splice(r, 1), t.partOf = null, this
    }, o.prototype.onAdd = function (e) {
      r.prototype.onAdd.call(this, e);
      for (var t = 0; t < this.oneof.length; ++t) {
        var o = e.get(this.oneof[t]);
        o && !o.partOf && (o.partOf = this, this.fieldsArray.push(o))
      }
      n(this)
    }, o.prototype.onRemove = function (e) {
      for (var t, o = 0; o < this.fieldsArray.length; ++o)(t = this.fieldsArray[o]).parent && t.parent.remove(t);
      r.prototype.onRemove.call(this, e)
    }, o.d = function () {
      for (var e = new Array(arguments.length), r = 0; r < arguments.length;) e[r] = arguments[r++];
      return function (r, n) {
        t.decorateType(r.constructor).add(new o(n, e)), Object.defineProperty(r, n, {
          get: t.oneOfGetter(e),
          set: t.oneOfSetter(e)
        })
      }
    }, o._configure = function () {
      e = require("./field"), t = require("./util")
    };
  }, {
    "./object": "rb45",
    "./field": "ixQC",
    "./util": "HQWY"
  }],
  "5oGY": [function (require, module, exports) {
    module.exports = a;
    var n = /[\s{}=;:[\],'"()<>]/g,
      r = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
      t = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
      e = /^ *[*\/]+ */,
      i = /^\s*\*?\/*/,
      u = /\n/g,
      l = /\s/,
      f = /\\(.?)/g,
      o = {
        0: "\0",
        r: "\r",
        n: "\n",
        t: "\t"
      };

    function s(n) {
      return n.replace(f, function (n, r) {
        switch (r) {
          case "\\":
          case "":
            return r;
          default:
            return o[r] || ""
        }
      })
    }

    function a(f, o) {
      f = f.toString();
      var a = 0,
        c = f.length,
        h = 1,
        g = null,
        v = null,
        d = 0,
        p = !1,
        m = [],
        w = null;

      function x(n) {
        return Error("illegal " + n + " (line " + h + ")")
      }

      function b(n) {
        return f.charAt(n)
      }

      function k(n, r) {
        g = f.charAt(n++), d = h, p = !1;
        var t, l = n - (o ? 2 : 3);
        do {
          if (--l < 0 || "\n" === (t = f.charAt(l))) {
            p = !0;
            break
          }
        } while (" " === t || "\t" === t);
        for (var s = f.substring(n, r).split(u), a = 0; a < s.length; ++a) s[a] = s[a].replace(o ? i : e, "").trim();
        v = s.join("\n").trim()
      }

      function A(n) {
        var r = I(n),
          t = f.substring(n, r);
        return /^\s*\/{1,2}/.test(t)
      }

      function I(n) {
        for (var r = n; r < c && "\n" !== b(r);) r++;
        return r
      }

      function j() {
        if (m.length > 0) return m.shift();
        if (w) return function () {
          var n = "'" === w ? t : r;
          n.lastIndex = a - 1;
          var e = n.exec(f);
          if (!e) throw x("string");
          return a = n.lastIndex, y(w), w = null, s(e[1])
        }();
        var e, i, u, g, v;
        do {
          if (a === c) return null;
          for (e = !1; l.test(u = b(a));)
            if ("\n" === u && ++h, ++a === c) return null;
          if ("/" === b(a)) {
            if (++a === c) throw x("comment");
            if ("/" === b(a))
              if (o) {
                if (g = a, v = !1, A(a)) {
                  v = !0;
                  do {
                    if ((a = I(a)) === c) break;
                    a++
                  } while (A(a))
                } else a = Math.min(c, I(a) + 1);
                v && k(g, a), h++, e = !0
              } else {
                for (v = "/" === b(g = a + 1);
                  "\n" !== b(++a);)
                  if (a === c) return null;
                ++a, v && k(g, a - 1), ++h, e = !0
              }
            else {
              if ("*" !== (u = b(a))) return "/";
              g = a + 1, v = o || "*" === b(g);
              do {
                if ("\n" === u && ++h, ++a === c) throw x("comment");
                i = u, u = b(a)
              } while ("*" !== i || "/" !== u);
              ++a, v && k(g, a - 2), e = !0
            }
          }
        } while (e);
        var d = a;
        if (n.lastIndex = 0, !n.test(b(d++)))
          for (; d < c && !n.test(b(d));) ++d;
        var p = f.substring(a, a = d);
        return '"' !== p && "'" !== p || (w = p), p
      }

      function y(n) {
        m.push(n)
      }

      function E() {
        if (!m.length) {
          var n = j();
          if (null === n) return null;
          y(n)
        }
        return m[0]
      }
      return Object.defineProperty({
        next: j,
        peek: E,
        push: y,
        skip: function (n, r) {
          var t = E();
          if (t === n) return j(), !0;
          if (!r) throw x("token '" + t + "', '" + n + "' expected");
          return !1
        },
        cmnt: function (n) {
          var r = null;
          return void 0 === n ? d === h - 1 && (o || "*" === g || p) && (r = v) : (d < n && E(), d !== n || p || !o && "/" !== g || (r = v)), r
        }
      }, "line", {
        get: function () {
          return h
        }
      })
    }
    a.unescape = s;
  }, {}],
  "J/IO": [function (require, module, exports) {
    function e(t) {
      return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(t)
    }
    module.exports = n;
    var t, o, r = require("./field");

    function n(e, t, n, i, y, p) {
      if (r.call(this, e, t, i, void 0, void 0, y, p), !o.isString(n)) throw TypeError("keyType must be a string");
      this.keyType = n, this.resolvedKeyType = null, this.map = !0
    }((n.prototype = Object.create(r.prototype)).constructor = n).className = "MapField", n.fromJSON = function (e, t) {
      return new n(e, t.id, t.keyType, t.type, t.options, t.comment)
    }, n.prototype.toJSON = function (e) {
      var t = !!e && Boolean(e.keepComments);
      return o.toObject(["keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", t ? this.comment : void 0])
    }, n.prototype.resolve = function () {
      if (this.resolved) return this;
      if (void 0 === t.mapKey[this.keyType]) throw Error("invalid key type: " + this.keyType);
      return r.prototype.resolve.call(this)
    }, n.d = function (t, r, i) {
      return "function" == typeof i ? i = o.decorateType(i).name : i && "object" === e(i) && (i = o.decorateEnum(i).name),
        function (e, y) {
          o.decorateType(e.constructor).add(new n(y, t, r, i))
        }
    }, n._configure = function () {
      t = require("./types"), o = require("./util")
    };
  }, {
    "./field": "ixQC",
    "./types": "K1j0",
    "./util": "HQWY"
  }],
  "Dw/M": [function (require, module, exports) {
    "use strict";
    module.exports = s;
    var e, t = require("./object");

    function s(s, r, o, i, p, n, u, y) {
      if (e.isObject(p) ? (u = p, p = n = void 0) : e.isObject(n) && (u = n, n = void 0), void 0 !== r && !e.isString(r)) throw TypeError("type must be a string");
      if (!e.isString(o)) throw TypeError("requestType must be a string");
      if (!e.isString(i)) throw TypeError("responseType must be a string");
      t.call(this, s, u), this.type = r || "rpc", this.requestType = o, this.requestStream = !!p || void 0, this.responseType = i, this.responseStream = !!n || void 0, this.resolvedRequestType = null, this.resolvedResponseType = null, this.comment = y
    }((s.prototype = Object.create(t.prototype)).constructor = s).className = "Method", s.fromJSON = function (e, t) {
      return new s(e, t.type, t.requestType, t.responseType, t.requestStream, t.responseStream, t.options, t.comment)
    }, s.prototype.toJSON = function (t) {
      var s = !!t && Boolean(t.keepComments);
      return e.toObject(["type", "rpc" !== this.type && this.type || void 0, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", s ? this.comment : void 0])
    }, s.prototype.resolve = function () {
      return this.resolved ? this : (this.resolvedRequestType = this.parent.lookupType(this.requestType), this.resolvedResponseType = this.parent.lookupType(this.responseType), t.prototype.resolve.call(this))
    }, s._configure = function () {
      e = require("./util")
    };
  }, {
    "./object": "rb45",
    "./util": "HQWY"
  }],
  "3MUg": [function (require, module, exports) {
    "use strict";
    module.exports = t;
    var e = require("../util");

    function t(t, r, i) {
      if ("function" != typeof t) throw TypeError("rpcImpl must be a function");
      e.EventEmitter.call(this), this.rpcImpl = t, this.requestDelimited = Boolean(r), this.responseDelimited = Boolean(i)
    }(t.prototype = Object.create(e.EventEmitter.prototype)).constructor = t, t.prototype.rpcCall = function t(r, i, n, o, l) {
      if (!o) throw TypeError("request must be specified");
      var u = this;
      if (!l) return e.asPromise(t, u, r, i, n, o);
      if (u.rpcImpl) try {
        return u.rpcImpl(r, i[u.requestDelimited ? "encodeDelimited" : "encode"](o).finish(), function (e, t) {
          if (e) return u.emit("error", e, r), l(e);
          if (null !== t) {
            if (!(t instanceof n)) try {
              t = n[u.responseDelimited ? "decodeDelimited" : "decode"](t)
            } catch (e) {
              return u.emit("error", e, r), l(e)
            }
            return u.emit("data", t, r), l(null, t)
          }
          u.end(!0)
        })
      } catch (c) {
        return u.emit("error", c, r), void setTimeout(function () {
          l(c)
        }, 0)
      } else setTimeout(function () {
        l(Error("already ended"))
      }, 0)
    }, t.prototype.end = function (e) {
      return this.rpcImpl && (e || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this
    };
  }, {
    "../util": "HQWY"
  }],
  "irfy": [function (require, module, exports) {
    "use strict";
    module.exports = s;
    var e, t, r, o = require("./namespace");

    function s(e, t) {
      o.call(this, e, t), this.methods = {}, this._methodsArray = null
    }

    function n(e) {
      return e._methodsArray = null, e
    }((s.prototype = Object.create(o.prototype)).constructor = s).className = "Service", s.fromJSON = function (t, r) {
      var o = new s(t, r.options);
      if (r.methods)
        for (var n = Object.keys(r.methods), i = 0; i < n.length; ++i) o.add(e.fromJSON(n[i], r.methods[n[i]]));
      return r.nested && o.addJSON(r.nested), o.comment = r.comment, o
    }, s.prototype.toJSON = function (e) {
      var r = o.prototype.toJSON.call(this, e),
        s = !!e && Boolean(e.keepComments);
      return t.toObject(["options", r && r.options || void 0, "methods", o.arrayToJSON(this.methodsArray, e) || {}, "nested", r && r.nested || void 0, "comment", s ? this.comment : void 0])
    }, Object.defineProperty(s.prototype, "methodsArray", {
      get: function () {
        return this._methodsArray || (this._methodsArray = t.toArray(this.methods))
      }
    }), s.prototype.get = function (e) {
      return this.methods[e] || o.prototype.get.call(this, e)
    }, s.prototype.resolveAll = function () {
      for (var e = this.methodsArray, t = 0; t < e.length; ++t) e[t].resolve();
      return o.prototype.resolve.call(this)
    }, s.prototype.add = function (t) {
      if (this.get(t.name)) throw Error("duplicate name '" + t.name + "' in " + this);
      return t instanceof e ? (this.methods[t.name] = t, t.parent = this, n(this)) : o.prototype.add.call(this, t)
    }, s.prototype.remove = function (t) {
      if (t instanceof e) {
        if (this.methods[t.name] !== t) throw Error(t + " is not a member of " + this);
        return delete this.methods[t.name], t.parent = null, n(this)
      }
      return o.prototype.remove.call(this, t)
    }, s.prototype.create = function (e, o, s) {
      for (var n, i = new r.Service(e, o, s), h = 0; h < this.methodsArray.length; ++h) {
        var a = t.lcFirst((n = this._methodsArray[h]).resolve().name).replace(/[^$\w_]/g, "");
        i[a] = t.codegen(["r", "c"], t.isReserved(a) ? a + "_" : a)("return this.rpcCall(m,q,s,r,c)")({
          m: n,
          q: n.resolvedRequestType.ctor,
          s: n.resolvedResponseType.ctor
        })
      }
      return i
    }, s._configure = function () {
      e = require("./method"), t = require("./util"), r = require("./rpc/service")
    };
  }, {
    "./namespace": "C9/l",
    "./method": "Dw/M",
    "./util": "HQWY",
    "./rpc/service": "3MUg"
  }],
  "zAwM": [function (require, module, exports) {
    "use strict";
    var e, t, r, n, a, i, o, s, c, f, u;
    module.exports = x, x.filename = null, x.defaults = {
      keepCase: !1
    };
    var p = /^[1-9][0-9]*$/,
      w = /^-?[1-9][0-9]*$/,
      h = /^0[x][0-9a-fA-F]+$/,
      d = /^-?0[x][0-9a-fA-F]+$/,
      l = /^0[0-7]+$/,
      m = /^-?0[0-7]+$/,
      v = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
      k = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
      b = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
      q = /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/;

    function x(A, y, g) {
      y instanceof t || (g = y, y = new t), g || (g = x.defaults);
      var $, I, F, N, z, Z = e(A, g.alternateCommentMode || !1),
        _ = Z.next,
        E = Z.push,
        C = Z.peek,
        M = Z.skip,
        O = Z.cmnt,
        j = !0,
        K = !1,
        L = y,
        R = g.keepCase ? function (e) {
          return e
        } : u.camelCase;

      function S(e, t, r) {
        var n = x.filename;
        return r || (x.filename = null), Error("illegal " + (t || "token") + " '" + e + "' (" + (n ? n + ", " : "") + "line " + Z.line + ")")
      }

      function T() {
        var e, t = [];
        do {
          if ('"' !== (e = _()) && "'" !== e) throw S(e);
          t.push(_()), M(e), e = C()
        } while ('"' === e || "'" === e);
        return t.join("")
      }

      function U(e) {
        var t = _();
        switch (t) {
          case "'":
          case '"':
            return E(t), T();
          case "true":
          case "TRUE":
            return !0;
          case "false":
          case "FALSE":
            return !1
        }
        try {
          return function (e, t) {
            var r = 1;
            "-" === e.charAt(0) && (r = -1, e = e.substring(1));
            switch (e) {
              case "inf":
              case "INF":
              case "Inf":
                return r * (1 / 0);
              case "nan":
              case "NAN":
              case "Nan":
              case "NaN":
                return NaN;
              case "0":
                return 0
            }
            if (p.test(e)) return r * parseInt(e, 10);
            if (h.test(e)) return r * parseInt(e, 16);
            if (l.test(e)) return r * parseInt(e, 8);
            if (v.test(e)) return r * parseFloat(e);
            throw S(e, "number", t)
          }(t, !0)
        } catch (r) {
          if (e && b.test(t)) return t;
          throw S(t, "value")
        }
      }

      function X(e, t) {
        var r, n;
        do {
          !t || '"' !== (r = C()) && "'" !== r ? e.push([n = B(_()), M("to", !0) ? B(_()) : n]) : e.push(T())
        } while (M(",", !0));
        M(";")
      }

      function B(e, t) {
        switch (e) {
          case "max":
          case "MAX":
          case "Max":
            return 536870911;
          case "0":
            return 0
        }
        if (!t && "-" === e.charAt(0)) throw S(e, "id");
        if (w.test(e)) return parseInt(e, 10);
        if (d.test(e)) return parseInt(e, 16);
        if (m.test(e)) return parseInt(e, 8);
        throw S(e, "id")
      }

      function D() {
        if (void 0 !== $) throw S("package");
        if ($ = _(), !b.test($)) throw S($, "name");
        L = L.define($), M(";")
      }

      function G() {
        var e, t = C();
        switch (t) {
          case "weak":
            e = F || (F = []), _();
            break;
          case "public":
            _();
          default:
            e = I || (I = [])
        }
        t = T(), M(";"), e.push(t)
      }

      function H() {
        if (M("="), N = T(), !(K = "proto3" === N) && "proto2" !== N) throw S(N, "syntax");
        M(";")
      }

      function J(e, t) {
        switch (t) {
          case "option":
            return V(e, t), M(";"), !0;
          case "message":
            return function (e, t) {
              if (!k.test(t = _())) throw S(t, "type name");
              var n = new r(t);
              P(n, function (e) {
                if (!J(n, e)) switch (e) {
                  case "map":
                    ! function (e) {
                      M("<");
                      var t = _();
                      if (void 0 === f.mapKey[t]) throw S(t, "type");
                      M(",");
                      var r = _();
                      if (!b.test(r)) throw S(r, "type");
                      M(">");
                      var n = _();
                      if (!k.test(n)) throw S(n, "name");
                      M("=");
                      var i = new a(R(n), B(_()), t, r);
                      P(i, function (e) {
                        if ("option" !== e) throw S(e);
                        V(i, e), M(";")
                      }, function () {
                        ee(i)
                      }), e.add(i)
                    }(n);
                    break;
                  case "required":
                  case "optional":
                  case "repeated":
                    Q(n, e);
                    break;
                  case "oneof":
                    ! function (e, t) {
                      if (!k.test(t = _())) throw S(t, "name");
                      var r = new i(R(t));
                      P(r, function (e) {
                        "option" === e ? (V(r, e), M(";")) : (E(e), Q(r, "optional"))
                      }), e.add(r)
                    }(n, e);
                    break;
                  case "extensions":
                    X(n.extensions || (n.extensions = []));
                    break;
                  case "reserved":
                    X(n.reserved || (n.reserved = []), !0);
                    break;
                  default:
                    if (!K || !b.test(e)) throw S(e);
                    E(e), Q(n, "optional")
                }
              }), e.add(n)
            }(e, t), !0;
          case "enum":
            return function (e, t) {
              if (!k.test(t = _())) throw S(t, "name");
              var r = new o(t);
              P(r, function (e) {
                switch (e) {
                  case "option":
                    V(r, e), M(";");
                    break;
                  case "reserved":
                    X(r.reserved || (r.reserved = []), !0);
                    break;
                  default:
                    ! function (e, t) {
                      if (!k.test(t)) throw S(t, "name");
                      M("=");
                      var r = B(_(), !0),
                        n = {};
                      P(n, function (e) {
                        if ("option" !== e) throw S(e);
                        V(n, e), M(";")
                      }, function () {
                        ee(n)
                      }), e.add(t, r, n.comment)
                    }(r, e)
                }
              }), e.add(r)
            }(e, t), !0;
          case "service":
            return function (e, t) {
              if (!k.test(t = _())) throw S(t, "service name");
              var r = new s(t);
              P(r, function (e) {
                if (!J(r, e)) {
                  if ("rpc" !== e) throw S(e);
                  ! function (e, t) {
                    var r = t;
                    if (!k.test(t = _())) throw S(t, "name");
                    var n, a, i, o, s = t;
                    M("("), M("stream", !0) && (a = !0);
                    if (!b.test(t = _())) throw S(t);
                    n = t, M(")"), M("returns"), M("("), M("stream", !0) && (o = !0);
                    if (!b.test(t = _())) throw S(t);
                    i = t, M(")");
                    var f = new c(s, r, n, i, a, o);
                    P(f, function (e) {
                      if ("option" !== e) throw S(e);
                      V(f, e), M(";")
                    }), e.add(f)
                  }(r, e)
                }
              }), e.add(r)
            }(e, t), !0;
          case "extend":
            return function (e, t) {
              if (!b.test(t = _())) throw S(t, "reference");
              var r = t;
              P(null, function (t) {
                switch (t) {
                  case "required":
                  case "repeated":
                  case "optional":
                    Q(e, t, r);
                    break;
                  default:
                    if (!K || !b.test(t)) throw S(t);
                    E(t), Q(e, "optional", r)
                }
              })
            }(e, t), !0
        }
        return !1
      }

      function P(e, t, r) {
        var n = Z.line;
        if (e && (e.comment = O(), e.filename = x.filename), M("{", !0)) {
          for (var a;
            "}" !== (a = _());) t(a);
          M(";", !0)
        } else r && r(), M(";"), e && "string" != typeof e.comment && (e.comment = O(n))
      }

      function Q(e, t, a) {
        var i = _();
        if ("group" !== i) {
          if (!b.test(i)) throw S(i, "type");
          var o = _();
          if (!k.test(o)) throw S(o, "name");
          o = R(o), M("=");
          var s = new n(o, B(_()), i, t, a);
          P(s, function (e) {
            if ("option" !== e) throw S(e);
            V(s, e), M(";")
          }, function () {
            ee(s)
          }), e.add(s), K || !s.repeated || void 0 === f.packed[i] && void 0 !== f.basic[i] || s.setOption("packed", !1, !0)
        } else ! function (e, t) {
          var a = _();
          if (!k.test(a)) throw S(a, "name");
          var i = u.lcFirst(a);
          a === i && (a = u.ucFirst(a));
          M("=");
          var o = B(_()),
            s = new r(a);
          s.group = !0;
          var c = new n(i, o, a, t);
          c.filename = x.filename, P(s, function (e) {
            switch (e) {
              case "option":
                V(s, e), M(";");
                break;
              case "required":
              case "optional":
              case "repeated":
                Q(s, e);
                break;
              default:
                throw S(e)
            }
          }), e.add(s).add(c)
        }(e, t)
      }

      function V(e, t) {
        var r = M("(", !0);
        if (!b.test(t = _())) throw S(t, "name");
        var n = t;
        r && (M(")"), n = "(" + n + ")", t = C(), q.test(t) && (n += t, _())), M("="), W(e, n)
      }

      function W(e, t) {
        if (M("{", !0))
          do {
            if (!k.test(z = _())) throw S(z, "name");
            "{" === C() ? W(e, t + "." + z) : (M(":"), "{" === C() ? W(e, t + "." + z) : Y(e, t + "." + z, U(!0)))
          } while (!M("}", !0));
        else Y(e, t, U(!0))
      }

      function Y(e, t, r) {
        e.setOption && e.setOption(t, r)
      }

      function ee(e) {
        if (M("[", !0)) {
          do {
            V(e, "option")
          } while (M(",", !0));
          M("]")
        }
        return e
      }
      for (; null !== (z = _());) switch (z) {
        case "package":
          if (!j) throw S(z);
          D();
          break;
        case "import":
          if (!j) throw S(z);
          G();
          break;
        case "syntax":
          if (!j) throw S(z);
          H();
          break;
        case "option":
          if (!j) throw S(z);
          V(L, z), M(";");
          break;
        default:
          if (J(L, z)) {
            j = !1;
            continue
          }
          throw S(z)
      }
      return x.filename = null, {
        package: $,
        imports: I,
        weakImports: F,
        syntax: N,
        root: y
      }
    }
    x._configure = function () {
      e = require("./tokenize"), t = require("./root"), r = require("./type"), n = require("./field"), a = require("./mapField"), i = require("./oneof"), o = require("./enum"), s = require("./service"), c = require("./method"), f = require("./types"), u = require("./util")
    };
  }, {
    "./tokenize": "5oGY",
    "./root": "W2Lj",
    "./type": "EOlb",
    "./field": "ixQC",
    "./mapField": "J/IO",
    "./oneof": "ZsNy",
    "./enum": "IUvN",
    "./service": "irfy",
    "./method": "Dw/M",
    "./types": "K1j0",
    "./util": "HQWY"
  }],
  "RclE": [function (require, module, exports) {
    module.exports = t;
    var e, l = /\/|\./;

    function t(e, u) {
      l.test(e) || (e = "google/protobuf/" + e + ".proto", u = {
        nested: {
          google: {
            nested: {
              protobuf: {
                nested: u
              }
            }
          }
        }
      }), t[e] = u
    }
    t("any", {
      Any: {
        fields: {
          type_url: {
            type: "string",
            id: 1
          },
          value: {
            type: "bytes",
            id: 2
          }
        }
      }
    }), t("duration", {
      Duration: e = {
        fields: {
          seconds: {
            type: "int64",
            id: 1
          },
          nanos: {
            type: "int32",
            id: 2
          }
        }
      }
    }), t("timestamp", {
      Timestamp: e
    }), t("empty", {
      Empty: {
        fields: {}
      }
    }), t("struct", {
      Struct: {
        fields: {
          fields: {
            keyType: "string",
            type: "Value",
            id: 1
          }
        }
      },
      Value: {
        oneofs: {
          kind: {
            oneof: ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]
          }
        },
        fields: {
          nullValue: {
            type: "NullValue",
            id: 1
          },
          numberValue: {
            type: "double",
            id: 2
          },
          stringValue: {
            type: "string",
            id: 3
          },
          boolValue: {
            type: "bool",
            id: 4
          },
          structValue: {
            type: "Struct",
            id: 5
          },
          listValue: {
            type: "ListValue",
            id: 6
          }
        }
      },
      NullValue: {
        values: {
          NULL_VALUE: 0
        }
      },
      ListValue: {
        fields: {
          values: {
            rule: "repeated",
            type: "Value",
            id: 1
          }
        }
      }
    }), t("wrappers", {
      DoubleValue: {
        fields: {
          value: {
            type: "double",
            id: 1
          }
        }
      },
      FloatValue: {
        fields: {
          value: {
            type: "float",
            id: 1
          }
        }
      },
      Int64Value: {
        fields: {
          value: {
            type: "int64",
            id: 1
          }
        }
      },
      UInt64Value: {
        fields: {
          value: {
            type: "uint64",
            id: 1
          }
        }
      },
      Int32Value: {
        fields: {
          value: {
            type: "int32",
            id: 1
          }
        }
      },
      UInt32Value: {
        fields: {
          value: {
            type: "uint32",
            id: 1
          }
        }
      },
      BoolValue: {
        fields: {
          value: {
            type: "bool",
            id: 1
          }
        }
      },
      StringValue: {
        fields: {
          value: {
            type: "string",
            id: 1
          }
        }
      },
      BytesValue: {
        fields: {
          value: {
            type: "bytes",
            id: 1
          }
        }
      }
    }), t("field_mask", {
      FieldMask: {
        fields: {
          paths: {
            rule: "repeated",
            type: "string",
            id: 1
          }
        }
      }
    }), t.get = function (e) {
      return t[e] || null
    };
  }, {}],
  "g5I+": [function (require, module, exports) {

    var t, e, n = module.exports = {};

    function r() {
      throw new Error("setTimeout has not been defined")
    }

    function o() {
      throw new Error("clearTimeout has not been defined")
    }

    function i(e) {
      if (t === setTimeout) return setTimeout(e, 0);
      if ((t === r || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
      try {
        return t(e, 0)
      } catch (n) {
        try {
          return t.call(null, e, 0)
        } catch (n) {
          return t.call(this, e, 0)
        }
      }
    }

    function u(t) {
      if (e === clearTimeout) return clearTimeout(t);
      if ((e === o || !e) && clearTimeout) return e = clearTimeout, clearTimeout(t);
      try {
        return e(t)
      } catch (n) {
        try {
          return e.call(null, t)
        } catch (n) {
          return e.call(this, t)
        }
      }
    }! function () {
      try {
        t = "function" == typeof setTimeout ? setTimeout : r
      } catch (n) {
        t = r
      }
      try {
        e = "function" == typeof clearTimeout ? clearTimeout : o
      } catch (n) {
        e = o
      }
    }();
    var c, s = [],
      l = !1,
      a = -1;

    function f() {
      l && c && (l = !1, c.length ? s = c.concat(s) : a = -1, s.length && h())
    }

    function h() {
      if (!l) {
        var t = i(f);
        l = !0;
        for (var e = s.length; e;) {
          for (c = s, s = []; ++a < e;) c && c[a].run();
          a = -1, e = s.length
        }
        c = null, l = !1, u(t)
      }
    }

    function m(t, e) {
      this.fun = t, this.array = e
    }

    function p() {}
    n.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      s.push(new m(t, e)), 1 !== s.length || l || i(h)
    }, m.prototype.run = function () {
      this.fun.apply(null, this.array)
    }, n.title = "browser", n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = p, n.addListener = p, n.once = p, n.off = p, n.removeListener = p, n.removeAllListeners = p, n.emit = p, n.prependListener = p, n.prependOnceListener = p, n.listeners = function (t) {
      return []
    }, n.binding = function (t) {
      throw new Error("process.binding is not supported")
    }, n.cwd = function () {
      return "/"
    }, n.chdir = function (t) {
      throw new Error("process.chdir is not supported")
    }, n.umask = function () {
      return 0
    };
  }, {}],
  "W2Lj": [function (require, module, exports) {
    var process = require("process");
    var e = require("process");

    function t(e) {
      return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(e)
    }
    module.exports = u;
    var r = require("./namespace");
    ((u.prototype = Object.create(r.prototype)).constructor = u).className = "Root";
    var n, o, i, s = require("./field"),
      f = require("./enum"),
      a = require("./oneof"),
      l = require("./util");

    function u(e) {
      r.call(this, "", e), this.deferred = [], this.files = [], this.names = []
    }

    function p() {}

    function d(e, r, n) {
      "function" == typeof r && (n = r, r = void 0);
      var s = this;
      if (!n) return l.asPromise(d, s, e, r);
      var f = null;
      if ("string" == typeof e) f = JSON.parse(e);
      else {
        if ("object" !== t(e)) return void console.log("pb格式转化失败");
        f = e
      }

      function a(e, t) {
        if (n) {
          var r = n;
          n = null, r(e, t)
        }
      }

      function u(e, t) {
        try {
          if (l.isString(t) && "{" === t.charAt(0) && (t = JSON.parse(t)), l.isString(t)) {
            o.filename = e;
            var n, i = o(t, s, r),
              f = 0;
            if (i.imports)
              for (; f < i.imports.length; ++f) p(n = i.imports[f]);
            if (i.weakImports) {
              for (f = 0; f < i.weakImports.length; ++f) n = i.weakImports[f];
              p(n)
            }
          } else s.setOptions(t.options).addJSON(t.nested)
        } catch (u) {
          a(u)
        }
        a(null, s)
      }

      function p(e) {
        s.names.indexOf(e) > -1 || (s.names.push(e), e in i && u(e, i[e]))
      }
      u(f.name, f.pbJsonStr)
    }
    u.fromJSON = function (e, t) {
      return e = "string" == typeof e ? JSON.parse(e) : e, t || (t = new u), e.options && t.setOptions(e.options), t.addJSON(e.nested)
    }, u.prototype.resolvePath = l.path.resolve, u.prototype.parseFromPbString = d, u.prototype.load = function e(t, r, n) {
      "function" == typeof r && (n = r, r = void 0);
      var s = this;
      if (!n) return l.asPromise(e, s, t, r);
      var f = n === p;

      function a(e, t) {
        if (n) {
          var r = n;
          if (n = null, f) throw e;
          r(e, t)
        }
      }

      function u(e, t) {
        try {
          if (l.isString(t) && "{" === t.charAt(0) && (t = JSON.parse(t)), l.isString(t)) {
            o.filename = e;
            var n, i = o(t, s, r),
              u = 0;
            if (i.imports)
              for (; u < i.imports.length; ++u)(n = s.resolvePath(e, i.imports[u])) && d(n);
            if (i.weakImports)
              for (u = 0; u < i.weakImports.length; ++u)(n = s.resolvePath(e, i.weakImports[u])) && d(n, !0)
          } else s.setOptions(t.options).addJSON(t.nested)
        } catch (p) {
          a(p)
        }
        f || c || a(null, s)
      }

      function d(e, t) {
        var r = e.lastIndexOf("google/protobuf/");
        if (r > -1) {
          var o = e.substring(r);
          o in i && (e = o)
        }
        if (!(s.files.indexOf(e) > -1))
          if (s.files.push(e), e in i) f ? u(e, i[e]) : (++c, setTimeout(function () {
            --c, u(e, i[e])
          }));
          else if (f) {
          var p;
          try {
            p = l.fs.readFileSync(e).toString("utf8")
          } catch (d) {
            return void(t || a(d))
          }
          u(e, p)
        } else ++c, l.fetch(e, function (r, o) {
          --c, n && (r ? t ? c || a(null, s) : a(r) : u(e, o))
        })
      }
      var c = 0;
      l.isString(t) && (t = [t]);
      for (var m, h = 0; h < t.length; ++h)(m = s.resolvePath("", t[h])) && d(m);
      if (f) return s;
      c || a(null, s)
    }, u.prototype.loadSync = function (e, t) {
      if (!l.isNode) throw Error("not supported");
      return this.load(e, t, p)
    }, u.prototype.resolveAll = function () {
      if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map(function (e) {
        return "'extend " + e.extend + "' in " + e.parent.fullName
      }).join(", "));
      return r.prototype.resolveAll.call(this)
    };
    var c = /^[A-Z]/;

    function m(e, t) {
      var r = t.parent.lookup(t.extend);
      if (r) {
        var n = new s(t.fullName, t.id, t.type, t.rule, void 0, t.options);
        return n.declaringField = t, t.extensionField = n, r.add(n), !0
      }
      return !1
    }
    u.prototype._handleAdd = function (e) {
      if (e instanceof s) void 0 === e.extend || e.extensionField || m(this, e) || this.deferred.push(e);
      else if (e instanceof f) c.test(e.name) && (e.parent[e.name] = e.values);
      else if (!(e instanceof a)) {
        if (e instanceof n)
          for (var t = 0; t < this.deferred.length;) m(this, this.deferred[t]) ? this.deferred.splice(t, 1) : ++t;
        for (var r = 0; r < e.nestedArray.length; ++r) this._handleAdd(e._nestedArray[r]);
        c.test(e.name) && (e.parent[e.name] = e)
      }
    }, u.prototype._handleRemove = function (e) {
      if (e instanceof s) {
        if (void 0 !== e.extend)
          if (e.extensionField) e.extensionField.parent.remove(e.extensionField), e.extensionField = null;
          else {
            var t = this.deferred.indexOf(e);
            t > -1 && this.deferred.splice(t, 1)
          }
      } else if (e instanceof f) c.test(e.name) && delete e.parent[e.name];
      else if (e instanceof r) {
        for (var n = 0; n < e.nestedArray.length; ++n) this._handleRemove(e._nestedArray[n]);
        c.test(e.name) && delete e.parent[e.name]
      }
    }, u._configure = function () {
      n = require("./type"), o = require("./parse"), i = require("./common"), s = require("./field"), f = require("./enum"), a = require("./oneof"), l = require("./util")
    };
  }, {
    "./namespace": "C9/l",
    "./field": "ixQC",
    "./enum": "IUvN",
    "./oneof": "ZsNy",
    "./util": "HQWY",
    "./type": "EOlb",
    "./parse": "zAwM",
    "./common": "RclE",
    "process": "g5I+"
  }],
  "rb45": [function (require, module, exports) {
    "use strict";
    var t, o;

    function e(o, e) {
      if (!t.isString(o)) throw TypeError("name must be a string");
      if (e && !t.isObject(e)) throw TypeError("options must be an object");
      this.options = e, this.name = o, this.parent = null, this.resolved = !1, this.comment = null, this.filename = null
    }
    module.exports = e, e.className = "ReflectionObject", Object.defineProperties(e.prototype, {
      root: {
        get: function () {
          for (var t = this; null !== t.parent;) t = t.parent;
          return t
        }
      },
      fullName: {
        get: function () {
          for (var t = [this.name], o = this.parent; o;) t.unshift(o.name), o = o.parent;
          return t.join(".")
        }
      }
    }), e.prototype.toJSON = function () {
      throw Error()
    }, e.prototype.onAdd = function (t) {
      this.parent && this.parent !== t && this.parent.remove(this), this.parent = t, this.resolved = !1;
      var e = t.root;
      e instanceof o && e._handleAdd(this)
    }, e.prototype.onRemove = function (t) {
      var e = t.root;
      e instanceof o && e._handleRemove(this), this.parent = null, this.resolved = !1
    }, e.prototype.resolve = function () {
      return this.resolved ? this : (this.root instanceof o && (this.resolved = !0), this)
    }, e.prototype.getOption = function (t) {
      if (this.options) return this.options[t]
    }, e.prototype.setOption = function (t, o, e) {
      return e && this.options && void 0 !== this.options[t] || ((this.options || (this.options = {}))[t] = o), this
    }, e.prototype.setOptions = function (t, o) {
      if (t)
        for (var e = Object.keys(t), n = 0; n < e.length; ++n) this.setOption(e[n], t[e[n]], o);
      return this
    }, e.prototype.toString = function () {
      var t = this.constructor.className,
        o = this.fullName;
      return o.length ? t + " " + o : t
    }, e._configure = function (e) {
      o = require("./root"), t = require("./util")
    };
  }, {
    "./root": "W2Lj",
    "./util": "HQWY"
  }],
  "C9/l": [function (require, module, exports) {
    module.exports = u;
    var e, t, r, n, o, i = require("./object");

    function s(e, t) {
      if (e && e.length) {
        for (var r = {}, n = 0; n < e.length; ++n) r[e[n].name] = e[n].toJSON(t);
        return r
      }
    }

    function u(e, t) {
      i.call(this, e, t), this.nested = void 0, this._nestedArray = null
    }

    function f(e) {
      return e._nestedArray = null, e
    }((u.prototype = Object.create(i.prototype)).constructor = u).className = "Namespace", u.fromJSON = function (e, t) {
      return new u(e, t.options).addJSON(t.nested)
    }, u.arrayToJSON = s, u.isReservedId = function (e, t) {
      if (e)
        for (var r = 0; r < e.length; ++r)
          if ("string" != typeof e[r] && e[r][0] <= t && e[r][1] >= t) return !0;
      return !1
    }, u.isReservedName = function (e, t) {
      if (e)
        for (var r = 0; r < e.length; ++r)
          if (e[r] === t) return !0;
      return !1
    }, Object.defineProperty(u.prototype, "nestedArray", {
      get: function () {
        return this._nestedArray || (this._nestedArray = r.toArray(this.nested))
      }
    }), u.prototype.toJSON = function (e) {
      return r.toObject(["options", this.options, "nested", s(this.nestedArray, e)])
    }, u.prototype.addJSON = function (r) {
      if (r)
        for (var i, s = Object.keys(r), f = 0; f < s.length; ++f) i = r[s[f]], this.add((void 0 !== i.fields ? n.fromJSON : void 0 !== i.values ? e.fromJSON : void 0 !== i.methods ? o.fromJSON : void 0 !== i.id ? t.fromJSON : u.fromJSON)(s[f], i));
      return this
    }, u.prototype.get = function (e) {
      return this.nested && this.nested[e] || null
    }, u.prototype.getEnum = function (t) {
      if (this.nested && this.nested[t] instanceof e) return this.nested[t].values;
      throw Error("no such enum: " + t)
    }, u.prototype.add = function (r) {
      if (!(r instanceof t && void 0 !== r.extend || r instanceof n || r instanceof e || r instanceof o || r instanceof u)) throw TypeError("object must be a valid nested object");
      if (this.nested) {
        var i = this.get(r.name);
        if (i) {
          if (!(i instanceof u && r instanceof u) || i instanceof n || i instanceof o) throw Error("duplicate name '" + r.name + "' in " + this);
          for (var s = i.nestedArray, h = 0; h < s.length; ++h) r.add(s[h]);
          this.remove(i), this.nested || (this.nested = {}), r.setOptions(i.options, !0)
        }
      } else this.nested = {};
      return this.nested[r.name] = r, r.onAdd(this), f(this)
    }, u.prototype.remove = function (e) {
      if (!(e instanceof i)) throw TypeError("object must be a ReflectionObject");
      if (e.parent !== this) throw Error(e + " is not a member of " + this);
      return delete this.nested[e.name], Object.keys(this.nested).length || (this.nested = void 0), e.onRemove(this), f(this)
    }, u.prototype.define = function (e, t) {
      if (r.isString(e)) e = e.split(".");
      else if (!Array.isArray(e)) throw TypeError("illegal path");
      if (e && e.length && "" === e[0]) throw Error("path must be relative");
      for (var n = this; e.length > 0;) {
        var o = e.shift();
        if (n.nested && n.nested[o]) {
          if (!((n = n.nested[o]) instanceof u)) throw Error("path conflicts with non-namespace objects")
        } else n.add(n = new u(o))
      }
      return t && n.addJSON(t), n
    }, u.prototype.resolveAll = function () {
      for (var e = this.nestedArray, t = 0; t < e.length;) e[t] instanceof u ? e[t++].resolveAll() : e[t++].resolve();
      return this.resolve()
    }, u.prototype.lookup = function (e, t, n) {
      if ("boolean" == typeof t ? (n = t, t = void 0) : t && !Array.isArray(t) && (t = [t]), r.isString(e) && e.length) {
        if ("." === e) return this.root;
        e = e.split(".")
      } else if (!e.length) return this;
      if ("" === e[0]) return this.root.lookup(e.slice(1), t);
      var o = this.get(e[0]);
      if (o) {
        if (1 === e.length) {
          if (!t || t.indexOf(o.constructor) > -1) return o
        } else if (o instanceof u && (o = o.lookup(e.slice(1), t, !0))) return o
      } else
        for (var i = 0; i < this.nestedArray.length; ++i)
          if (this._nestedArray[i] instanceof u && (o = this._nestedArray[i].lookup(e, t, !0))) return o;
      return null === this.parent || n ? null : this.parent.lookup(e, t)
    }, u.prototype.lookupType = function (e) {
      var t = this.lookup(e, [n]);
      if (!t) throw Error("no such type: " + e);
      return t
    }, u.prototype.lookupEnum = function (t) {
      var r = this.lookup(t, [e]);
      if (!r) throw Error("no such Enum '" + t + "' in " + this);
      return r
    }, u.prototype.lookupTypeOrEnum = function (t) {
      var r = this.lookup(t, [n, e]);
      if (!r) throw Error("no such Type or Enum '" + t + "' in " + this);
      return r
    }, u.prototype.lookupService = function (e) {
      var t = this.lookup(e, [o]);
      if (!t) throw Error("no such Service '" + e + "' in " + this);
      return t
    }, u._configure = function () {
      e = require("./enum"), t = require("./field"), r = require("./util"), n = require("./type"), o = require("./service")
    };
  }, {
    "./object": "rb45",
    "./enum": "IUvN",
    "./field": "ixQC",
    "./util": "HQWY",
    "./type": "EOlb",
    "./service": "irfy"
  }],
  "HlFT": [function (require, module, exports) {
    "use strict";
    var t;

    function e(t) {
      if (t)
        for (var e = Object.keys(t), n = 0; n < e.length; ++n) this[e[n]] = t[e[n]]
    }
    module.exports = e, e.create = function (t) {
      return this.$type.create(t)
    }, e.encode = function (t, e) {
      return arguments.length ? 1 == arguments.length ? this.$type.encode(arguments[0]) : this.$type.encode(arguments[0], arguments[1]) : this.$type.encode(this)
    }, e.encodeDelimited = function (t, e) {
      return this.$type.encodeDelimited(t, e)
    }, e.decode = function (t) {
      return this.$type.decode(t)
    }, e.decodeDelimited = function (t) {
      return this.$type.decodeDelimited(t)
    }, e.verify = function (t) {
      return this.$type.verify(t)
    }, e.fromObject = function (t) {
      return this.$type.fromObject(t)
    }, e.toObject = function (t, e) {
      return t = t || this, this.$type.toObject(t, e)
    }, e.prototype.toJSON = function () {
      return this.$type.toObject(this, t.toJSONOptions)
    }, e.set = function (t, n) {
      e[t] = n
    }, e.get = function (t) {
      return e[t]
    }, e._configure = function () {
      t = require("./util")
    };
  }, {
    "./util": "HQWY"
  }],
  "DJ+B": [function (require, module, exports) {
    module.exports = e;
    var t, i, s, r = require("./util");

    function o(t, i) {
      return RangeError("index out of range: " + t.pos + " + " + (i || 1) + " > " + t.len)
    }

    function e(t) {
      this.buf = t, this.pos = 0, this.len = t.length
    }
    var n = "undefined" != typeof Uint8Array ? function (t) {
      if (t instanceof Uint8Array || Array.isArray(t)) return new e(t);
      // if ("undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer) return new e(new Uint8Array(t));
      if ("undefined" != typeof ArrayBuffer && Object.prototype.toString.call(t) === "[object ArrayBuffer]") return new e(new Uint8Array(t));
      throw Error("illegal buffer")
    } : function (t) {
      if (Array.isArray(t)) return new e(t);
      throw Error("illegal buffer")
    };

    function h() {
      var i = new t(0, 0),
        s = 0;
      if (!(this.len - this.pos > 4)) {
        for (; s < 3; ++s) {
          if (this.pos >= this.len) throw o(this);
          if (i.lo = (i.lo | (127 & this.buf[this.pos]) << 7 * s) >>> 0, this.buf[this.pos++] < 128) return i
        }
        return i.lo = (i.lo | (127 & this.buf[this.pos++]) << 7 * s) >>> 0, i
      }
      for (; s < 4; ++s)
        if (i.lo = (i.lo | (127 & this.buf[this.pos]) << 7 * s) >>> 0, this.buf[this.pos++] < 128) return i;
      if (i.lo = (i.lo | (127 & this.buf[this.pos]) << 28) >>> 0, i.hi = (i.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, this.buf[this.pos++] < 128) return i;
      if (s = 0, this.len - this.pos > 4) {
        for (; s < 5; ++s)
          if (i.hi = (i.hi | (127 & this.buf[this.pos]) << 7 * s + 3) >>> 0, this.buf[this.pos++] < 128) return i
      } else
        for (; s < 5; ++s) {
          if (this.pos >= this.len) throw o(this);
          if (i.hi = (i.hi | (127 & this.buf[this.pos]) << 7 * s + 3) >>> 0, this.buf[this.pos++] < 128) return i
        }
      throw Error("invalid varint encoding")
    }

    function u(t, i) {
      return (t[i - 4] | t[i - 3] << 8 | t[i - 2] << 16 | t[i - 1] << 24) >>> 0
    }

    function f() {
      if (this.pos + 8 > this.len) throw o(this, 8);
      return new t(u(this.buf, this.pos += 4), u(this.buf, this.pos += 4))
    }
    e.create = r.Buffer ? function (t) {
      return (e.create = function (t) {
        return r.Buffer.isBuffer(t) ? new s(t) : n(t)
      })(t)
    } : n, e.prototype._slice = r.Array.prototype.subarray || r.Array.prototype.slice, e.prototype.uint32 = function () {
      var t = 4294967295;
      return function () {
        if (t = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128) return t;
        if (t = (t | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128) return t;
        if (t = (t | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128) return t;
        if (t = (t | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128) return t;
        if (t = (t | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128) return t;
        if ((this.pos += 5) > this.len) throw this.pos = this.len, o(this, 10);
        return t
      }
    }(), e.prototype.int32 = function () {
      return 0 | this.uint32()
    }, e.prototype.sint32 = function () {
      var t = this.uint32();
      return t >>> 1 ^ -(1 & t) | 0
    }, e.prototype.bool = function () {
      return 0 !== this.uint32()
    }, e.prototype.fixed32 = function () {
      if (this.pos + 4 > this.len) throw o(this, 4);
      return u(this.buf, this.pos += 4)
    }, e.prototype.sfixed32 = function () {
      if (this.pos + 4 > this.len) throw o(this, 4);
      return 0 | u(this.buf, this.pos += 4)
    }, e.prototype.float = function () {
      if (this.pos + 4 > this.len) throw o(this, 4);
      var t = r.float.readFloatLE(this.buf, this.pos);
      return this.pos += 4, t
    }, e.prototype.double = function () {
      if (this.pos + 8 > this.len) throw o(this, 4);
      var t = r.float.readDoubleLE(this.buf, this.pos);
      return this.pos += 8, t
    }, e.prototype.bytes = function () {
      var t = this.uint32(),
        i = this.pos,
        s = this.pos + t;
      if (s > this.len) throw o(this, t);
      return this.pos += t, Array.isArray(this.buf) ? this.buf.slice(i, s) : i === s ? new this.buf.constructor(0) : this._slice.call(this.buf, i, s)
    }, e.prototype.string = function () {
      var t = this.bytes();
      return i.read(t, 0, t.length)
    }, e.prototype.skip = function (t) {
      if ("number" == typeof t) {
        if (this.pos + t > this.len) throw o(this, t);
        this.pos += t
      } else
        do {
          if (this.pos >= this.len) throw o(this)
        } while (128 & this.buf[this.pos++]);
      return this
    }, e.prototype.skipType = function (t) {
      switch (t) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          for (;;) {
            if (4 == (t = 7 & this.uint32())) break;
            this.skipType(t)
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + t + " at offset " + this.pos)
      }
      return this
    }, e._configure = function () {
      t = require("./longBits"), i = require("./utf8");
      var s = r.Long ? "toLong" : "toNumber";
      r.merge(e.prototype, {
        int64: function () {
          return h.call(this)[s](!1)
        },
        uint64: function () {
          return h.call(this)[s](!0)
        },
        sint64: function () {
          return h.call(this).zzDecode()[s](!1)
        },
        fixed64: function () {
          return f.call(this)[s](!0)
        },
        sfixed64: function () {
          return f.call(this)[s](!1)
        }
      })
    };
  }, {
    "./util": "HQWY",
    "./longBits": "n7JO",
    "./utf8": "DDeL"
  }],
  "rxi2": [function (require, module, exports) {
    function e(r) {
      return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(r)
    }
    var r, t;

    function n(e, r) {
      return e.name + ": " + r + (e.repeated && "array" !== r ? "[]" : e.map && "object" !== r ? "{k:" + e.keyType + "}" : "") + " expected"
    }

    function i(e, i, a, s) {
      var f = s.types;
      if (e.resolvedType)
        if (e.resolvedType instanceof r) {
          if (Object.keys(e.resolvedType.values).indexOf(a) < 0) return n(e, "enum value")
        } else {
          var o = f[i].verify(a);
          if (o) return e.name + "." + o
        }
      else switch (e.type) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
          if (!t.isInteger(a)) return n(e, "integer");
          break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
          if (!(t.isInteger(a) || a && t.isInteger(a.low) && t.isInteger(a.high))) return n(e, "integer|Long");
          break;
        case "float":
        case "double":
          if ("number" != typeof a) return n(e, "number");
          break;
        case "bool":
          if ("boolean" != typeof a) return n(e, "boolean");
          break;
        case "string":
          if (!t.isString(a)) return n(e, "string");
          break;
        case "bytes":
          if (!(a && "number" == typeof a.length || t.isString(a))) return n(e, "buffer")
      }
    }

    function a(e, r) {
      switch (e.keyType) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
          if (!t.key32Re.test(r)) return n(e, "integer key");
          break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
          if (!t.key64Re.test(r)) return n(e, "integer|Long key");
          break;
        case "bool":
          if (!t.key2Re.test(r)) return n(e, "boolean key")
      }
    }

    function s(r) {
      return function (s) {
        return function (f) {
          var o;
          if ("object" !== e(f) || null === f) return "object expected";
          var u, c = {};
          r.oneofsArray.length && (u = {});
          for (var y = 0; y < r.fieldsArray.length; ++y) {
            var l, b = r._fieldsArray[y].resolve(),
              p = f[b.name];
            if (!b.optional || null != p && f.hasOwnProperty(b.name))
              if (b.map) {
                if (!t.isObject(p)) return n(b, "object");
                var m = Object.keys(p);
                for (l = 0; l < m.length; ++l) {
                  if (o = a(b, m[l])) return o;
                  if (o = i(b, y, p[m[l]], s)) return o
                }
              } else if (b.repeated) {
              if (!Array.isArray(p)) return n(b, "array");
              for (l = 0; l < p.length; ++l)
                if (o = i(b, y, p[l], s)) return o
            } else {
              if (b.partOf) {
                var g = b.partOf.name;
                if (1 === c[b.partOf.name] && 1 === u[g]) return b.partOf.name + ": multiple values";
                u[g] = 1
              }
              if (o = i(b, y, p, s)) return o
            }
          }
        }
      }
    }
    module.exports = s, s._configure = function () {
      r = require("./enum"), t = require("./util")
    };
  }, {
    "./enum": "IUvN",
    "./util": "HQWY"
  }],
  "o/lx": [function (require, module, exports) {
    var e, i;

    function n(n) {
      return function (r) {
        var t = r.Writer,
          o = r.types,
          l = r.util;
        return function (r, d) {
          d = d || t.create();
          for (var u = n.fieldsArray.slice().sort(l.compareFieldsById), a = 0; a < u.length; a++) {
            var p = u[a],
              f = n._fieldsArray.indexOf(p),
              s = p.resolvedType instanceof e ? "uint32" : p.type,
              y = i.basic[s],
              c = r[p.name];
            if (p.resolvedType instanceof e && "string" == typeof c && (c = o[f].values[c]), p.map) {
              if (null != c && r.hasOwnProperty(p.name))
                for (var m = Object.keys(c), v = 0; v < m.length; ++v) d.uint32((p.id << 3 | 2) >>> 0).fork().uint32(8 | i.mapKey[p.keyType])[p.keyType](m[v]), void 0 === y ? o[f].encode(c[m[v]], d.uint32(18).fork()).ldelim().ldelim() : d.uint32(16 | y)[s](c[m[v]]).ldelim()
            } else if (p.repeated) {
              if (c && c.length)
                if (p.packed && void 0 !== i.packed[s]) {
                  d.uint32((p.id << 3 | 2) >>> 0).fork();
                  for (var k = 0; k < c.length; k++) d[s](c[k]);
                  d.ldelim()
                } else
                  for (var g = 0; g < c.length; g++) void 0 === y ? p.resolvedType.group ? o[f].encode(c[g], d.uint32((p.id << 3 | 3) >>> 0)).uint32((p.id << 3 | 4) >>> 0) : o[f].encode(c[g], d.uint32((p.id << 3 | 2) >>> 0).fork()).ldelim() : d.uint32((p.id << 3 | y) >>> 0)[s](c[g])
            } else(!p.optional || null != c && r.hasOwnProperty(p.name)) && (p.optional || null != c && r.hasOwnProperty(p.name) || console.warn("注意啦!!!很大概率会报错 类型:", r.$type ? r.$type.name : "不晓得", "没有设置对应的属性:", p.name, "检查是不是proto文件属性设置为了required"), void 0 === y ? p.resolvedType.group ? o[f].encode(c, d.uint32((p.id << 3 | 3) >>> 0)).uint32((p.id << 3 | 4) >>> 0) : o[f].encode(c, d.uint32((p.id << 3 | 2) >>> 0).fork()).ldelim() : d.uint32((p.id << 3 | y) >>> 0)[s](c))
          }
          return d
        }
      }
    }
    module.exports = n, n._configure = function () {
      e = require("./enum"), i = require("./types")
    };
  }, {
    "./enum": "IUvN",
    "./types": "K1j0"
  }],
  "vfqs": [function (require, module, exports) {
    function e(o) {
      return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(o)
    }
    var o, r, n;

    function t(e) {
      return "missing required '" + e.name + "'"
    }

    function i(i) {
      return function (u) {
        var l = u.Reader,
          s = u.types,
          p = u.util;
        return function (u, c) {
          u instanceof l || (u = l.create(u));
          for (var a, f = void 0 === c ? u.len : u.pos + c, y = new this.ctor; u.pos < f;) {
            var d = u.uint32();
            if (i.group && 4 == (7 & d)) break;
            for (var b = d >>> 3, m = 0, v = !1; m < i.fieldsArray.length; ++m) {
              var g = i._fieldsArray[m].resolve(),
                h = g.name,
                T = g.resolvedType instanceof o ? "int32" : g.type;
              if (b == g.id) {
                if (v = !0, g.map) u.skip().pos++, y[h] === p.emptyObject && (y[h] = {}), a = u[g.keyType](), u.pos++, null != r.long[g.keyType] ? null == r.basic[T] ? y[h]["object" === e(a) ? p.longToHash(a) : a] = s[m].decode(u, u.uint32()) : y[h]["object" === e(a) ? p.longToHash(a) : a] = u[T]() : null == r.basic[T] ? y[h] = s[m].decode(u, u.uint32()) : y[h] = u[T]();
                else if (g.repeated)
                  if (y[h] && y[h].length || (y[h] = []), null != r.packed[T] && 2 == (7 & d))
                    for (var k = u.uint32() + u.pos; u.pos < k;) y[h].push(u[T]());
                  else null == r.basic[T] ? g.resolvedType.group ? y[h].push(s[m].decode(u)) : y[h].push(s[m].decode(u, u.uint32())) : y[h].push(u[T]());
                else null == r.basic[T] ? g.resolvedType.group ? y[h] = s[m].decode(u) : y[h] = s[m].decode(u, u.uint32()) : y[h] = u[T]();
                break
              }
            }
            v || (console.log("t", d), u.skipType(7 & d))
          }
          for (m = 0; m < i._fieldsArray.length; ++m) {
            var q = i._fieldsArray[m];
            if (q.required && !y.hasOwnProperty(q.name)) throw n.ProtocolError(t(q), {
              instance: y
            })
          }
          return y
        }
      }
    }
    module.exports = i, i._configure = function () {
      o = require("./enum"), r = require("./types"), n = require("./util")
    };
  }, {
    "./enum": "IUvN",
    "./types": "K1j0",
    "./util": "HQWY"
  }],
  "Sw+e": [function (require, module, exports) {
    var t, e = exports;
    e[".google.protobuf.Any"] = {
      fromObject: function (t) {
        if (t && t["@type"]) {
          var e = this.lookup(t["@type"]);
          if (e) {
            var r = "." === t["@type"].charAt(0) ? t["@type"].substr(1) : t["@type"];
            return this.create({
              type_url: "/" + r,
              value: e.encode(e.fromObject(t)).finish()
            })
          }
        }
        return this.fromObject(t)
      },
      toObject: function (e, r) {
        if (r && r.json && e.type_url && e.value) {
          var o = e.type_url.substring(e.type_url.lastIndexOf("/") + 1),
            u = this.lookup(o);
          u && (e = u.decode(e.value))
        }
        if (!(e instanceof this.ctor) && e instanceof t) {
          var n = e.$type.toObject(e, r);
          return n["@type"] = e.$type.fullName, n
        }
        return this.toObject(e, r)
      }
    }, e._configure = function () {
      t = require("./message")
    };
  }, {
    "./message": "HlFT"
  }],
  "ET28": [function (require, module, exports) {
    function e(t) {
      return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(t)
    }
    var t, r, n = module.exports;

    function o(n, o, s, i) {
      var a = i.m,
        l = i.d,
        f = i.types,
        c = i.ksi,
        u = void 0 !== c;
      if (n.resolvedType)
        if (n.resolvedType instanceof t) {
          for (var g = u ? l[s][c] : l[s], y = n.resolvedType.values, p = Object.keys(y), b = 0; b < p.length; b++)
            if (!(n.repeated && y[p[b]] === n.typeDefault || p[b] != g && y[p[b]] != g)) {
              u ? a[s][c] = y[p[b]] : a[s] = y[p[b]];
              break
            }
        } else {
          if ("object" !== e(u ? l[s][c] : l[s])) throw TypeError(n.fullName + ": object expected");
          u ? a[s][c] = f[o].fromObject(l[s][c]) : a[s] = f[o].fromObject(l[s])
        }
      else {
        var m = !1;
        switch (n.type) {
          case "double":
          case "float":
            u ? a[s][c] = Number(l[s][c]) : a[s] = Number(l[s]);
            break;
          case "uint32":
          case "fixed32":
            u ? a[s][c] = l[s][c] >>> 0 : a[s] = l[s] >>> 0;
            break;
          case "int32":
          case "sint32":
          case "sfixed32":
            u ? a[s][c] = 0 | l[s][c] : a[s] = 0 | l[s];
            break;
          case "uint64":
            m = !0;
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            r.Long ? u ? a[s][c] = r.Long.fromValue(l[s][c]).unsigned = m : a[s] = r.Long.fromValue(l[s]).unsigned = m : "string" == typeof (u ? l[s][c] : l[s]) ? u ? a[s][c] = parseInt(l[s][c], 10) : a[s] = parseInt(l[s], 10) : "number" == typeof (u ? l[s][c] : l[s]) ? u ? a[s][c] = l[s][c] : a[s] = l[s] : "object" === e(u ? l[s][c] : l[s]) && (u ? a[s][c] = new r.LongBits(l[s][c].low >>> 0, l[s][c].high >>> 0).toNumber(m) : a[s] = new r.LongBits(l[s].low >>> 0, l[s].high >>> 0).toNumber(m));
            break;
          case "bytes":
            "string" == typeof (u ? l[s][c] : l[s]) ? u ? r.base64.decode(l[s][c], a[s][c] = r.newBuffer(r.base64.length(l[s][c])), 0) : r.base64.decode(l[s], a[s] = r.newBuffer(r.base64.length(l[s])), 0): (u ? l[s][c] : l[s]).length && (u ? a[s][c] = l[s][c] : a[s] = l[s]);
            break;
          case "string":
            u ? a[s][c] = String(l[s][c]) : a[s] = String(l[s]);
            break;
          case "bool":
            u ? a[s][c] = Boolean(l[s][c]) : a[s] = Boolean(l[s])
        }
      }
    }

    function s(e, n, o, s) {
      var i = s.m,
        a = s.d,
        l = s.types,
        f = s.ksi,
        c = s.o,
        u = void 0 !== f;
      if (e.resolvedType) e.resolvedType instanceof t ? u ? a[o][f] = c.enums === String ? l[n].values[i[o][f]] : i[o][f] : a[o] = c.enums === String ? l[n].values[i[o]] : i[o] : u ? a[o][f] = l[n].toObject(i[o][f], c) : a[o] = l[n].toObject(i[o], c);
      else {
        var g = !1;
        switch (e.type) {
          case "double":
          case "float":
            u ? a[o][f] = c.json && !isFinite(i[o][f]) ? String(i[o][f]) : i[o][f] : a[o] = c.json && !isFinite(i[o]) ? String(i[o]) : i[o];
            break;
          case "uint64":
            g = !0;
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            "number" == typeof i[o][f] ? u ? a[o][f] = c.longs === String ? String(i[o][f]) : i[o][f] : a[o] = c.longs === String ? String(i[o]) : i[o] : u ? a[o][f] = c.longs === String ? r.Long.prototype.toString.call(i[o][f]) : c.longs === Number ? new r.LongBits(i[o][f].low >>> 0, i[o][f].high >>> 0).toNumber(g) : i[o][f] : a[o] = c.longs === String ? r.Long.prototype.toString.call(i[o]) : c.longs === Number ? new r.LongBits(i[o].low >>> 0, i[o].high >>> 0).toNumber(g) : i[o];
            break;
          case "bytes":
            u ? a[o][f] = c.bytes === String ? r.base64.encode(i[o][f], 0, i[o][f].length) : c.bytes === Array ? Array.prototype.slice.call(i[o][f]) : i[o][f] : a[o] = c.bytes === String ? r.base64.encode(i[o], 0, i[o].length) : c.bytes === Array ? Array.prototype.slice.call(i[o]) : i[o];
            break;
          default:
            u ? a[o][f] = i[o][f] : a[o] = i[o]
        }
      }
    }
    n._configure = function () {
      t = require("./enum"), r = require("./util")
    }, n.fromObject = function (n) {
      var s = n.fieldsArray;
      return function (n) {
        return function (i) {
          if (i instanceof this.ctor) return i;
          if (!s.length) return new this.ctor;
          for (var a = new this.ctor, l = 0; l < s.length; ++l) {
            var f, c = s[l].resolve(),
              u = c.name;
            if (c.map) {
              if (i[u]) {
                if ("object" !== e(i[u])) throw TypeError(c.fullName + ": object expected");
                a[u] = {}
              }
              var g = Object.keys(i[u]);
              for (f = 0; f < g.length; ++f) o(c, l, u, r.merge(r.copy(n), {
                m: a,
                d: i,
                ksi: g[f]
              }))
            } else if (c.repeated) {
              if (i[u]) {
                if (!Array.isArray(i[u])) throw TypeError(c.fullName + ": array expected");
                for (a[u] = [], f = 0; f < i[u].length; ++f) o(c, l, u, r.merge(r.copy(n), {
                  m: a,
                  d: i,
                  ksi: f
                }))
              }
            } else(c.resolvedType instanceof t || null != i[u]) && o(c, l, u, r.merge(r.copy(n), {
              m: a,
              d: i
            }))
          }
          return a
        }
      }
    }, n.toObject = function (e) {
      var n = e.fieldsArray.slice().sort(r.compareFieldsById);
      return function (o) {
        return n.length ? function (i, a) {
          a = a || {};
          for (var l, f, c = {}, u = [], g = [], y = [], p = 0; p < n.length; ++p) n[p].partOf || (n[p].resolve().repeated ? u : n[p].map ? g : y).push(n[p]);
          if (u.length && (a.arrays || a.defaults))
            for (p = 0; p < u.length; ++p) c[u[p].name] = [];
          if (g.length && (a.objects || a.defaults))
            for (p = 0; p < g.length; ++p) c[g[p].name] = {};
          if (y.length && a.defaults)
            for (p = 0; p < y.length; ++p)
              if (f = (l = y[p]).name, l.resolvedType instanceof t) c[f] = a.enums = String ? l.resolvedType.valuesById[l.typeDefault] : l.typeDefault;
              else if (l.long)
            if (r.Long) {
              var b = new r.Long(l.typeDefault.low, l.typeDefault.high, l.typeDefault.unsigned);
              c[f] = a.longs === String ? b.toString() : a.longs === Number ? b.toNumber() : b
            } else c[f] = a.longs === String ? l.typeDefault.toString() : l.typeDefault.toNumber();
          else l.bytes ? c[f] = a.bytes === String ? String.fromCharCode.apply(String, l.typeDefault) : Array.prototype.slice.call(l.typeDefault).join("*..*").split("*..*") : c[f] = l.typeDefault;
          var m = !1;
          for (p = 0; p < n.length; ++p) {
            f = (l = n[p]).name;
            var d, h, v = e._fieldsArray.indexOf(l);
            if (l.map) {
              if (m || (m = !0), i[f] && (d = Object.keys(i[f]).length))
                for (c[f] = {}, h = 0; h < d.length; ++h) s(l, v, f, r.merge(r.copy(o), {
                  m: i,
                  d: c,
                  ksi: d[h],
                  o: a
                }))
            } else if (l.repeated) {
              if (i[f] && i[f].length)
                for (c[f] = [], h = 0; h < i[f].length; ++h) s(l, v, f, r.merge(r.copy(o), {
                  m: i,
                  d: c,
                  ksi: h,
                  o: a
                }))
            } else null != i[f] && i.hasOwnProperty(f) && s(l, v, f, r.merge(r.copy(o), {
              m: i,
              d: c,
              o: a
            })), l.partOf && a.oneofs && (c[l.partOf.name] = f)
          }
          return c
        } : function () {
          return {}
        }
      }
    };
  }, {
    "./enum": "IUvN",
    "./util": "HQWY"
  }],
  "EOlb": [function (require, module, exports) {
    module.exports = y;
    var e, t, r, i, o, s, n, d, f, h, l, u, a, c, p = require("./namespace");

    function y(e, t) {
      p.call(this, e, t), this.fields = {}, this.oneofs = void 0, this.extensions = void 0, this.reserved = void 0, this.group = void 0, this._fieldsById = null, this._fieldsArray = null, this._oneofsArray = null, this._ctor = null
    }

    function v(e) {
      return e._fieldsById = e._fieldsArray = e._oneofsArray = null, delete e.encode, delete e.decode, delete e.verify, e
    }((y.prototype = Object.create(p.prototype)).constructor = y).className = "Type", Object.defineProperties(y.prototype, {
      fieldsById: {
        get: function () {
          if (this._fieldsById) return this._fieldsById;
          this._fieldsById = {};
          for (var e = Object.keys(this.fields), t = 0; t < e.length; ++t) {
            var r = this.fields[e[t]],
              i = r.id;
            if (this._fieldsById[i]) throw Error("duplicate id " + i + " in " + this);
            this._fieldsById[i] = r
          }
          return this._fieldsById
        }
      },
      fieldsArray: {
        get: function () {
          return this._fieldsArray || (this._fieldsArray = n.toArray(this.fields))
        }
      },
      oneofsArray: {
        get: function () {
          return this._oneofsArray || (this._oneofsArray = n.toArray(this.oneofs))
        }
      },
      ctor: {
        get: function () {
          return this._ctor || (this.ctor = y.generateConstructor(this))
        },
        set: function (e) {
          var t = e.prototype;
          t instanceof r || ((e.prototype = new r).constructor = e, n.merge(e.prototype, t)), e.$type = e.prototype.$type = this, n.merge(e, r, !0), n.merge(e.prototype, r, !0), this._ctor = e;
          for (var i = 0; i < this.fieldsArray.length; ++i) this._fieldsArray[i].resolve();
          var o = {};
          for (i = 0; i < this.oneofsArray.length; ++i) {
            var s = this._oneofsArray[i].resolve().name,
              d = function (e) {
                for (var t = {}, r = 0; r < e.length; ++r) t[e[r]] = 0;
                return {
                  setter: function (r) {
                    if (!(e.indexOf(r) < 0)) {
                      t[r] = 1;
                      for (var i = 0; i < e.length; ++i) e[i] !== r && delete this[e[i]]
                    }
                  },
                  getter: function () {
                    for (var e = Object.keys(this), r = e.length - 1; r > -1; --r)
                      if (1 === t[e[r]] && void 0 !== this[e[r]] && null !== this[e[r]]) return e[r]
                  }
                }
              }(this._oneofsArray[i].oneof);
            o[s] = {
              get: d.getter,
              set: d.setter
            }
          }
          i && Object.defineProperties(e.prototype, o)
        }
      }
    }), y.generateConstructor = function (e) {
      return function (t) {
        for (var r, i = 0; i < e.fieldsArray.length; i++)(r = e._fieldsArray[i]).map ? this[r.name] = {} : r.repeated && (this[r.name] = []);
        if (t)
          for (var o = Object.keys(t), s = 0; s < o.length; ++s) null != t[o[s]] && (this[o[s]] = t[o[s]])
      }
    }, y.fromJSON = function (r, o) {
      var s = new y(r, o.options);
      s.extensions = o.extensions, s.reserved = o.reserved;
      for (var n = Object.keys(o.fields), d = 0; d < n.length; ++d) s.add((void 0 !== o.fields[n[d]].keyType ? c.fromJSON : t.fromJSON)(n[d], o.fields[n[d]]));
      if (o.oneofs)
        for (n = Object.keys(o.oneofs), d = 0; d < n.length; ++d) s.add(i.fromJSON(n[d], o.oneofs[n[d]]));
      if (o.nested)
        for (n = Object.keys(o.nested), d = 0; d < n.length; ++d) {
          var f = o.nested[n[d]];
          s.add((void 0 !== f.id ? t.fromJSON : void 0 !== f.fields ? y.fromJSON : void 0 !== f.values ? e.fromJSON : void 0 !== f.methods ? l.fromJSON : p.fromJSON)(n[d], f))
        }
      return o.extensions && o.extensions.length && (s.extensions = o.extensions), o.reserved && o.reserved.length && (s.reserved = o.reserved), o.group && (s.group = !0), o.comment && (s.comment = o.comment), s
    }, y.prototype.toJSON = function (e) {
      var t = p.prototype.toJSON.call(this, e),
        r = !!e && Boolean(e.keepComments);
      return {
        options: t && t.options || void 0,
        oneofs: p.arrayToJSON(this.oneofsArray, e),
        fields: p.arrayToJSON(this.fieldsArray.filter(function (e) {
          return !e.declaringField
        }), e) || {},
        extensions: this.extensions && this.extensions.length ? this.extensions : void 0,
        reserved: this.reserved && this.reserved.length ? this.reserved : void 0,
        group: this.group || void 0,
        nested: t && t.nested || void 0,
        comment: r ? this.comment : void 0
      }
    }, y.prototype.resolveAll = function () {
      for (var e = this.fieldsArray, t = 0; t < e.length;) e[t++].resolve();
      var r = this.oneofsArray;
      for (t = 0; t < r.length;) r[t++].resolve();
      return p.prototype.resolveAll.call(this)
    }, y.prototype.get = function (e) {
      return this.fields[e] || this.oneofs && this.oneofs[e] || this.nested && this.nested[e] || null
    }, y.prototype.add = function (e) {
      if (this.get(e.name)) throw Error("duplicate name '" + e.name + "' in " + this);
      if (e instanceof t && void 0 === e.extend) {
        if (this._fieldsById && this._fieldsById[e.id]) throw Error("duplicate id " + e.id + " in " + this);
        if (this.isReservedId(e.id)) throw Error("id " + e.id + " is reserved in " + this);
        if (this.isReservedName(e.name)) throw Error("name '" + e.name + "' is reserved in " + this);
        return e.parent && e.parent.remove(e), this.fields[e.name] = e, e.message = this, e.onAdd(this), v(this)
      }
      return e instanceof i ? (this.oneofs || (this.oneofs = {}), this.oneofs[e.name] = e, e.onAdd(this), v(this)) : p.prototype.add.call(this, e)
    }, y.prototype.remove = function (e) {
      if (e instanceof t && void 0 === e.extend) {
        if (!this.fields || this.fields[e.name] !== e) throw Error(e + " is not a member of " + this);
        return delete this.fields[e.name], e.parent = null, e.onRemove(this), v(this)
      }
      if (e instanceof i) {
        if (!this.oneofs || this.oneofs[e.name] !== e) throw Error(e + " is not a member of " + this);
        return delete this.oneofs[e.name], e.parent = null, e.onRemove(this), v(this)
      }
      return p.prototype.remove.call(this, e)
    }, y.prototype.isReservedId = function (e) {
      return p.isReservedId(this.reserved, e)
    }, y.prototype.isReservedName = function (e) {
      return p.isReservedName(this.reserved, e)
    }, y.prototype.create = function (e) {
      return new this.ctor(e)
    }, y.prototype.setup = function () {
      for (var e = this.fullName, t = [], r = 0; r < this.fieldsArray.length; ++r) t.push(this._fieldsArray[r].resolve().resolvedType);
      this.encode = f(this)({
        Writer: o,
        types: t,
        util: n
      }), this.decode = h(this)({
        Reader: s,
        types: t,
        util: n
      }), this.verify = d(this)({
        types: t,
        util: n
      }), this.fromObject = a.fromObject(this)({
        types: t,
        util: n
      }), this.toObject = a.toObject(this)({
        types: t,
        util: n
      });
      var i = u[e];
      if (i) {
        var l = Object.create(this);
        l.fromObject = this.fromObject, this.fromObject = i.fromObject.bind(l), l.toObject = this.toObject, this.toObject = i.toObject.bind(l)
      }
      return this
    }, y.prototype.encode = function (e, t) {
      return this.setup().encode(e, t)
    }, y.prototype.encodeDelimited = function (e, t) {
      return this.encode(e, t && t.len ? t.fork() : t).ldelim()
    }, y.prototype.decode = function (e, t) {
      return this.setup().decode(e, t)
    }, y.prototype.decodeDelimited = function (e) {
      return e instanceof s || (e = s.create(e)), this.decode(e, e.uint32())
    }, y.prototype.verify = function (e) {
      return this.setup().verify(e)
    }, y.prototype.fromObject = function (e) {
      return this.setup().fromObject(e)
    }, y.prototype.toObject = function (e, t) {
      return this.setup().toObject(e, t)
    }, y.d = function (e) {
      return function (t) {
        n.decorateType(t, e)
      }
    }, y._configure = function () {
      e = require("./enum"), t = require("./field"), r = require("./message"), i = require("./oneof"), o = require("./writer"), s = require("./reader"), n = require("./util"), d = require("./verifier"), f = require("./encoder"), h = require("./decoder"), l = require("./service"), u = require("./wrappers"), a = require("./converter"), c = require("./mapField")
    };
  }, {
    "./namespace": "C9/l",
    "./enum": "IUvN",
    "./field": "ixQC",
    "./message": "HlFT",
    "./oneof": "ZsNy",
    "./writer": "4o0f",
    "./reader": "DJ+B",
    "./util": "HQWY",
    "./verifier": "rxi2",
    "./encoder": "o/lx",
    "./decoder": "vfqs",
    "./service": "irfy",
    "./wrappers": "Sw+e",
    "./converter": "ET28",
    "./mapField": "J/IO"
  }],
  "HQWY": [function (require, module, exports) {
    function e(t) {
      return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      })(t)
    }
    var t = module.exports,
      r = require("./roots");
    t.LongBits = require("./longBits"), t.Long = require("./long"), t.pool = require("./pool"), t.float = require("./float"), t.asPromise = require("./asPromise"), t.EventEmitter = require("./EventEmitter"), t.path = require("./path"), t.base64 = require("./base64"), t.utf8 = require("./utf8"), t.compareFieldsById = function (e, t) {
      return e.id - t.id
    }, t.toArray = function (e) {
      if (e) {
        for (var t = Object.keys(e), r = new Array(t.length), n = 0; n < t.length;) r[n] = e[t[n++]];
        return r
      }
      return []
    }, t.toObject = function (e) {
      for (var t = {}, r = 0; r < e.length;) {
        var n = e[r++],
          o = e[r++];
        void 0 !== o && (t[n] = o)
      }
      return t
    }, t.isString = function (e) {
      return "string" == typeof e || e instanceof String
    };
    var n = /\\/g,
      o = /"/g;

    function i(t) {
      if ("object" != e(t)) return t;
      var r = {};
      for (var n in t) r[n] = i(t[n]);
      return r
    }
    t.isReserved = function (e) {
      return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(e)
    }, t.isObject = function (t) {
      return t && "object" === e(t)
    }, t.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array, t.oneOfGetter = function (e) {
      for (var t = {}, r = 0; r < e.length; ++r) t[e[r]] = 1;
      return function () {
        for (var e = Object.keys(this), r = e.length - 1; r > -1; --r)
          if (1 === t[e[r]] && void 0 !== this[e[r]] && null !== this[e[r]]) return e[r]
      }
    }, t.oneOfSetter = function (e) {
      return function (t) {
        for (var r = 0; r < e.length; ++r) e[r] !== t && delete this[e[r]]
      }
    }, t.merge = function (e, t, r) {
      for (var n = Object.keys(t), o = 0; o < n.length; ++o) void 0 !== e[n[o]] && r || (e[n[o]] = t[n[o]]);
      return e
    }, t.decorateType = function (e, r) {
      if (e.$type) return r && e.$type.name !== r && (t.decorateRoot.remove(e.$type), e.$type.name = r, t.decorateRoot.add(e.$type)), e.$type;
      Type || (Type = require("./type"));
      var n = new Type(r || e.name);
      return t.decorateRoot.add(n), n.ctor = e, Object.defineProperty(e, "$type", {
        value: n,
        enumerable: !1
      }), Object.defineProperty(e.prototype, "$type", {
        value: n,
        enumerable: !1
      }), n
    }, t.emptyArray = Object.freeze ? Object.freeze([]) : [], t.emptyObject = Object.freeze ? Object.freeze({}) : {}, t.longToHash = function (e) {
      return e ? t.LongBits.from(e).toHash() : t.LongBits.zeroHash
    }, t.copy = function (t) {
      if ("object" != e(t)) return t;
      var r = {};
      for (var n in t) r[n] = t[n];
      return r
    }, t.deepCopy = i, t.ProtocolError = function (e) {
      function t(e, r) {
        if (!(this instanceof t)) return new t(e, r);
        Object.defineProperty(this, "message", {
          get: function () {
            return e
          }
        }), Error.captureStackTrace ? Error.captureStackTrace(this, t) : Object.defineProperty(this, "stack", {
          value: (new Error).stack || ""
        }), r && merge(this, r)
      }
      return (t.prototype = Object.create(Error.prototype)).constructor = t, Object.defineProperty(t.prototype, "name", {
        get: function () {
          return e
        }
      }), t.prototype.toString = function () {
        return this.name + ": " + this.message
      }, t
    }, t.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: !0
    }, t.Buffer = null, t.newBuffer = function (e) {
      return "number" == typeof e ? new t.Array(e) : "undefined" == typeof Uint8Array ? e : new Uint8Array(e)
    }, t.stringToBytes = function (e) {
      var t, r, n = [];
      t = e.length;
      for (var o = 0; o < t; o++)(r = e.charCodeAt(o)) >= 65536 && r <= 1114111 ? (n.push(r >> 18 & 7 | 240), n.push(r >> 12 & 63 | 128), n.push(r >> 6 & 63 | 128), n.push(63 & r | 128)) : r >= 2048 && r <= 65535 ? (n.push(r >> 12 & 15 | 224), n.push(r >> 6 & 63 | 128), n.push(63 & r | 128)) : r >= 128 && r <= 2047 ? (n.push(r >> 6 & 31 | 192), n.push(63 & r | 128)) : n.push(255 & r);
      return n
    }, t.byteToString = function (e) {
      if ("string" == typeof e) return e;
      for (var t = "", r = e, n = 0; n < r.length; n++) {
        var o = r[n].toString(2),
          i = o.match(/^1+?(?=0)/);
        if (i && 8 == o.length) {
          for (var u = i[0].length, f = r[n].toString(2).slice(7 - u), a = 1; a < u; a++) f += r[a + n].toString(2).slice(2);
          t += String.fromCharCode(parseInt(f, 2)), n += u - 1
        } else t += String.fromCharCode(r[n])
      }
      return t
    }, t.isInteger = Number.isInteger || function (e) {
      return "number" == typeof e && isFinite(e) && Math.floor(e) === e
    }, Object.defineProperty(t, "decorateRoot", {
      get: function () {
        return r.decorated || (r.decorated = new(require("./root")))
      }
    });
  }, {
    "./roots": "Inpi",
    "./longBits": "n7JO",
    "./long": "YA3p",
    "./pool": "8kOt",
    "./float": "Hofe",
    "./asPromise": "Gmhw",
    "./EventEmitter": "fTab",
    "./path": "9xCK",
    "./base64": "lxH0",
    "./utf8": "DDeL",
    "./type": "EOlb",
    "./root": "W2Lj"
  }],
  "4o0f": [function (require, module, exports) {
    module.exports = u;
    var t, i, e, n = require("./util"),
      o = require("./utf8");

    function r(t, i, e) {
      this.fn = t, this.len = i, this.next = void 0, this.val = e
    }

    function s() {}

    function h(t) {
      this.head = t.head, this.tail = t.tail, this.len = t.len, this.next = t.states
    }

    function u() {
      this.len = 0, this.head = new r(s, 0, 0), this.tail = this.head, this.states = null
    }

    function l(t, i, e) {
      i[e] = 255 & t
    }

    function p(t, i, e) {
      for (; t > 127;) i[e++] = 127 & t | 128, t >>>= 7;
      i[e] = t
    }

    function a(t, i) {
      this.len = t, this.next = void 0, this.val = i
    }

    function f(t, i, e) {
      for (; t.hi;) i[e++] = 127 & t.lo | 128, t.lo = (t.lo >>> 7 | t.hi << 25) >>> 0, t.hi >>>= 7;
      for (; t.lo > 127;) i[e++] = 127 & t.lo | 128, t.lo = t.lo >>> 7;
      i[e++] = t.lo
    }

    function c(t, i, e) {
      i[e] = 255 & t, i[e + 1] = t >>> 8 & 255, i[e + 2] = t >>> 16 & 255, i[e + 3] = t >>> 24
    }
    u.create = n.Buffer ? function () {
      return (u.create = function () {
        return new i
      })()
    } : function () {
      return new u
    }, u.alloc = function (t) {
      return new n.Array(t)
    }, n.Array !== Array && (u.alloc = n.pool(u.alloc, n.Array.prototype.subarray)), u.prototype._push = function (t, i, e) {
      return this.tail = this.tail.next = new r(t, i, e), this.len += i, this
    }, a.prototype = Object.create(r.prototype), a.prototype.fn = p, u.prototype.uint32 = function (t) {
      return this.len += (this.tail = this.tail.next = new a((t >>>= 0) < 128 ? 1 : t < 16384 ? 2 : t < 2097152 ? 3 : t < 268435456 ? 4 : 5, t)).len, this
    }, u.prototype.int32 = function (i) {
      return i < 0 ? this._push(f, 10, t.fromNumber(i)) : this.uint32(i)
    }, u.prototype.sint32 = function (t) {
      return this.uint32((t << 1 ^ t >> 31) >>> 0)
    }, u.prototype.uint64 = function (i) {
      var e = t.from(i);
      return this._push(f, e.length(), e)
    }, u.prototype.int64 = u.prototype.uint64, u.prototype.sint64 = function (i) {
      var e = t.from(i).zzEncode();
      return this._push(f, e.length(), e)
    }, u.prototype.bool = function (t) {
      return this._push(l, 1, t ? 1 : 0)
    }, u.prototype.fixed32 = function (t) {
      return this._push(c, 4, t >>> 0)
    }, u.prototype.sfixed32 = u.prototype.fixed32, u.prototype.fixed64 = function (i) {
      var e = t.from(i);
      return this._push(c, 4, e.lo)._push(c, 4, e.hi)
    }, u.prototype.sfixed64 = u.prototype.fixed64, u.prototype.float = function (t) {
      return this._push(n.float.writeFloatLE, 4, t)
    }, u.prototype.double = function (t) {
      return this._push(n.float.writeDoubleLE, 8, t)
    };
    var y = n.Array.prototype.set ? function (t, i, e) {
      i.set(t, e)
    } : function (t, i, e) {
      for (var n = 0; n < t.length; ++n) i[e + n] = t[n]
    };
    u.prototype.bytes = function (t) {
      var i = t.length >>> 0;
      if (!i) return this._push(l, 1, 0);
      if (n.isString(t)) {
        var e = u.alloc(i = o.length(t));
        o.write(t, e, 0), t = e
      }
      return this.uint32(i)._push(y, i, t)
    }, u.prototype.string = function (t) {
      var i = o.length(t);
      return i ? this.uint32(i)._push(o.write, i, t) : this._push(l, 1, 0)
    }, u.prototype.fork = function () {
      return this.states = new h(this), this.head = this.tail = new r(s, 0, 0), this.len = 0, this
    }, u.prototype.reset = function () {
      return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new r(s, 0, 0), this.len = 0), this
    }, u.prototype.ldelim = function () {
      var t = this.head,
        i = this.tail,
        e = this.len;
      return this.reset().uint32(e), e && (this.tail.next = t.next, this.tail = i, this.len += e), this
    }, u.prototype.finish = function () {
      for (var t = this.head.next, i = this.constructor.alloc(this.len), e = 0; t;) t.fn(t.val, i, e), e += t.len, t = t.next;
      return i
    }, u._configure = function () {
      t = require("./longBits"), e = require("./base64"), o = require("./utf8")
    };
  }, {
    "./util": "HQWY",
    "./utf8": "DDeL",
    "./longBits": "n7JO",
    "./base64": "lxH0"
  }],
  "z2Zv": [function (require, module, exports) {
    module.exports = function () {
      var e = {};

      function r() {
        e.converter._configure(), e.decoder._configure(), e.encoder._configure(), e.Field._configure(), e.MapField._configure(), e.Message._configure(), e.Namespace._configure(), e.Method._configure(), e.ReflectionObject._configure(), e.OneOf._configure(), e.parse._configure(), e.Reader._configure(), e.Root._configure(), e.Service._configure(), e.verifier._configure(), e.Type._configure(), e.types._configure(), e.wrappers._configure(), e.Writer._configure()
      }
      if (e.build = "minimal", e.Writer = require("./src/writer"), e.encoder = require("./src/encoder"), e.Reader = require("./src/reader"), e.util = require("./src/util"), e.rpc = require("./src/rpc/service"), e.roots = require("./src/roots"), e.verifier = require("./src/verifier"), e.tokenize = require("./src/tokenize"), e.parse = require("./src/parse"), e.common = require("./src/common"), e.ReflectionObject = require("./src/object"), e.Namespace = require("./src/namespace"), e.Root = require("./src/root"), e.Enum = require("./src/enum"), e.Type = require("./src/type"), e.Field = require("./src/field"), e.OneOf = require("./src/oneof"), e.MapField = require("./src/mapField"), e.Service = require("./src/service"), e.Method = require("./src/method"), e.converter = require("./src/converter"), e.decoder = require("./src/decoder"), e.Message = require("./src/message"), e.wrappers = require("./src/wrappers"), e.types = require("./src/types"), e.util = require("./src/util"), e.configure = r, e.load = function (r, i, o) {
          return "function" == typeof i ? (o = i, i = new e.Root) : i || (i = new e.Root), i.load(r, o)
        }, e.loadSync = function (r, i) {
          return i || (i = new e.Root), i.loadSync(r)
        }, e.parseFromPbString = function (r, i, o) {
          return "function" == typeof i ? (o = i, i = new e.Root) : i || (i = new e.Root), i.parseFromPbString(r, o)
        }, r(), arguments && arguments.length)
        for (var i = 0; i < arguments.length; i++) {
          var o = arguments[i];
          if (o.hasOwnProperty("exports")) return void(o.exports = e)
        }
      return e
    }();
  }, {
    "./src/writer": "4o0f",
    "./src/encoder": "o/lx",
    "./src/reader": "DJ+B",
    "./src/util": "HQWY",
    "./src/rpc/service": "3MUg",
    "./src/roots": "Inpi",
    "./src/verifier": "rxi2",
    "./src/tokenize": "5oGY",
    "./src/parse": "zAwM",
    "./src/common": "RclE",
    "./src/object": "rb45",
    "./src/namespace": "C9/l",
    "./src/root": "W2Lj",
    "./src/enum": "IUvN",
    "./src/type": "EOlb",
    "./src/field": "ixQC",
    "./src/oneof": "ZsNy",
    "./src/mapField": "J/IO",
    "./src/service": "irfy",
    "./src/method": "Dw/M",
    "./src/converter": "ET28",
    "./src/decoder": "vfqs",
    "./src/message": "HlFT",
    "./src/wrappers": "Sw+e",
    "./src/types": "K1j0"
  }],
  "IK+g": [function (require, module, exports) {
    var global = arguments[3];
    var r = arguments[3];
    r.crypto && r.crypto.getRandomValues ? module.exports.randomBytes = function (o) {
      var t = new Uint8Array(o);
      return r.crypto.getRandomValues(t), t
    } : module.exports.randomBytes = function (r) {
      for (var o = new Array(r), t = 0; t < r; t++) o[t] = Math.floor(256 * Math.random());
      return o
    };
  }, {}],
  "kvjH": [function (require, module, exports) {
    "use strict";
    var r = require("crypto"),
      n = "abcdefghijklmnopqrstuvwxyz012345";
    module.exports = {
      string: function (t) {
        for (var e = n.length, u = r.randomBytes(t), o = [], i = 0; i < t; i++) o.push(n.substr(u[i] % e, 1));
        return o.join("")
      },
      number: function (r) {
        return Math.floor(Math.random() * r)
      },
      numberString: function (r) {
        var n = ("" + (r - 1)).length;
        return (new Array(n + 1).join("0") + this.number(r)).slice(-n)
      }
    };
  }, {
    "crypto": "IK+g"
  }],
  "q8Q2": [function (require, module, exports) {
    var global = arguments[3];
    var e = arguments[3],
      t = require("./random"),
      n = {},
      a = !1,
      o = e.chrome && e.chrome.app && e.chrome.app.runtime;
    module.exports = {
      attachEvent: function (t, n) {
        void 0 !== e.addEventListener ? e.addEventListener(t, n, !1) : e.document && e.attachEvent && (e.document.attachEvent("on" + t, n), e.attachEvent("on" + t, n))
      },
      detachEvent: function (t, n) {
        void 0 !== e.addEventListener ? e.removeEventListener(t, n, !1) : e.document && e.detachEvent && (e.document.detachEvent("on" + t, n), e.detachEvent("on" + t, n))
      },
      unloadAdd: function (e) {
        if (o) return null;
        var r = t.string(8);
        return n[r] = e, a && setTimeout(this.triggerUnloadCallbacks, 0), r
      },
      unloadDel: function (e) {
        e in n && delete n[e]
      },
      triggerUnloadCallbacks: function () {
        for (var e in n) n[e](), delete n[e]
      }
    };
    var r = function () {
      a || (a = !0, module.exports.triggerUnloadCallbacks())
    };
    o || module.exports.attachEvent("unload", r);
  }, {
    "./random": "kvjH"
  }],
  "qggR": [function (require, module, exports) {
    "use strict";
    module.exports = function (e, t) {
      if (t = t.split(":")[0], !(e = +e)) return !1;
      switch (t) {
        case "http":
        case "ws":
          return 80 !== e;
        case "https":
        case "wss":
          return 443 !== e;
        case "ftp":
          return 21 !== e;
        case "gopher":
          return 70 !== e;
        case "file":
          return !1
      }
      return 0 !== e
    };
  }, {}],
  "o5xf": [function (require, module, exports) {
    "use strict";
    var n, e = Object.prototype.hasOwnProperty;

    function t(n) {
      try {
        return decodeURIComponent(n.replace(/\+/g, " "))
      } catch (e) {
        return null
      }
    }

    function r(n) {
      try {
        return encodeURIComponent(n)
      } catch (e) {
        return null
      }
    }

    function o(n) {
      for (var e, r = /([^=?&]+)=?([^&]*)/g, o = {}; e = r.exec(n);) {
        var u = t(e[1]),
          c = t(e[2]);
        null === u || null === c || u in o || (o[u] = c)
      }
      return o
    }

    function u(t, r) {
      r = r || "";
      var o, u, c = [];
      for (u in "string" != typeof r && (r = "?"), t)
        if (e.call(t, u)) {
          if ((o = t[u]) || null !== o && o !== n && !isNaN(o) || (o = ""), u = encodeURIComponent(u), o = encodeURIComponent(o), null === u || null === o) continue;
          c.push(u + "=" + o)
        } return c.length ? r + c.join("&") : ""
    }
    exports.stringify = u, exports.parse = o;
  }, {}],
  "WxRL": [function (require, module, exports) {
    var global = arguments[3];
    var e = arguments[3],
      o = require("requires-port"),
      t = require("querystringify"),
      s = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
      r = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
      a = [
        ["#", "hash"],
        ["?", "query"],
        function (e) {
          return e.replace("\\", "/")
        },
        ["/", "pathname"],
        ["@", "auth", 1],
        [NaN, "host", void 0, 1, 1],
        [/:(\d+)$/, "port", void 0, 1],
        [NaN, "hostname", void 0, 1, 1]
      ],
      n = {
        hash: 1,
        query: 1
      };

    function i(o) {
      var t, s = ("undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {}).location || {},
        a = {},
        i = typeof (o = o || s);
      if ("blob:" === o.protocol) a = new l(unescape(o.pathname), {});
      else if ("string" === i)
        for (t in a = new l(o, {}), n) delete a[t];
      else if ("object" === i) {
        for (t in o) t in n || (a[t] = o[t]);
        void 0 === a.slashes && (a.slashes = r.test(o.href))
      }
      return a
    }

    function h(e) {
      var o = s.exec(e);
      return {
        protocol: o[1] ? o[1].toLowerCase() : "",
        slashes: !!o[2],
        rest: o[3]
      }
    }

    function p(e, o) {
      for (var t = (o || "/").split("/").slice(0, -1).concat(e.split("/")), s = t.length, r = t[s - 1], a = !1, n = 0; s--;) "." === t[s] ? t.splice(s, 1) : ".." === t[s] ? (t.splice(s, 1), n++) : n && (0 === s && (a = !0), t.splice(s, 1), n--);
      return a && t.unshift(""), "." !== r && ".." !== r || t.push(""), t.join("/")
    }

    function l(e, s, r) {
      if (!(this instanceof l)) return new l(e, s, r);
      var n, c, u, f, m, y, d = a.slice(),
        g = typeof s,
        v = this,
        w = 0;
      for ("object" !== g && "string" !== g && (r = s, s = null), r && "function" != typeof r && (r = t.parse), s = i(s), n = !(c = h(e || "")).protocol && !c.slashes, v.slashes = c.slashes || n && s.slashes, v.protocol = c.protocol || s.protocol || "", e = c.rest, c.slashes || (d[3] = [/(.*)/, "pathname"]); w < d.length; w++) "function" != typeof (f = d[w]) ? (u = f[0], y = f[1], u != u ? v[y] = e : "string" == typeof u ? ~(m = e.indexOf(u)) && ("number" == typeof f[2] ? (v[y] = e.slice(0, m), e = e.slice(m + f[2])) : (v[y] = e.slice(m), e = e.slice(0, m))) : (m = u.exec(e)) && (v[y] = m[1], e = e.slice(0, m.index)), v[y] = v[y] || n && f[3] && s[y] || "", f[4] && (v[y] = v[y].toLowerCase())) : e = f(e);
      r && (v.query = r(v.query)), n && s.slashes && "/" !== v.pathname.charAt(0) && ("" !== v.pathname || "" !== s.pathname) && (v.pathname = p(v.pathname, s.pathname)), o(v.port, v.protocol) || (v.host = v.hostname, v.port = ""), v.username = v.password = "", v.auth && (f = v.auth.split(":"), v.username = f[0] || "", v.password = f[1] || ""), v.origin = v.protocol && v.host && "file:" !== v.protocol ? v.protocol + "//" + v.host : "null", v.href = v.toString()
    }

    function c(e, s, r) {
      var n = this;
      switch (e) {
        case "query":
          "string" == typeof s && s.length && (s = (r || t.parse)(s)), n[e] = s;
          break;
        case "port":
          n[e] = s, o(s, n.protocol) ? s && (n.host = n.hostname + ":" + s) : (n.host = n.hostname, n[e] = "");
          break;
        case "hostname":
          n[e] = s, n.port && (s += ":" + n.port), n.host = s;
          break;
        case "host":
          n[e] = s, /:\d+$/.test(s) ? (s = s.split(":"), n.port = s.pop(), n.hostname = s.join(":")) : (n.hostname = s, n.port = "");
          break;
        case "protocol":
          n.protocol = s.toLowerCase(), n.slashes = !r;
          break;
        case "pathname":
        case "hash":
          if (s) {
            var i = "pathname" === e ? "/" : "#";
            n[e] = s.charAt(0) !== i ? i + s : s
          } else n[e] = s;
          break;
        default:
          n[e] = s
      }
      for (var h = 0; h < a.length; h++) {
        var p = a[h];
        p[4] && (n[p[1]] = n[p[1]].toLowerCase())
      }
      return n.origin = n.protocol && n.host && "file:" !== n.protocol ? n.protocol + "//" + n.host : "null", n.href = n.toString(), n
    }

    function u(e) {
      e && "function" == typeof e || (e = t.stringify);
      var o, s = this,
        r = s.protocol;
      r && ":" !== r.charAt(r.length - 1) && (r += ":");
      var a = r + (s.slashes ? "//" : "");
      return s.username && (a += s.username, s.password && (a += ":" + s.password), a += "@"), a += s.host + s.pathname, (o = "object" == typeof s.query ? e(s.query) : s.query) && (a += "?" !== o.charAt(0) ? "?" + o : o), s.hash && (a += s.hash), a
    }
    l.prototype = {
      set: c,
      toString: u
    }, l.extractProtocol = h, l.location = i, l.qs = t, module.exports = l;
  }, {
    "requires-port": "qggR",
    "querystringify": "o5xf"
  }],
  "prkv": [function (require, module, exports) {
    "use strict";
    var r = require("url-parse"),
      t = function () {};
    module.exports = {
      getOrigin: function (t) {
        if (!t) return null;
        var n = new r(t);
        if ("file:" === n.protocol) return null;
        var i = n.port;
        return i || (i = "https:" === n.protocol ? "443" : "80"), n.protocol + "//" + n.hostname + ":" + i
      },
      isOriginEqual: function (r, n) {
        var i = this.getOrigin(r) === this.getOrigin(n);
        return t("same", r, n, i), i
      },
      isSchemeEqual: function (r, t) {
        return r.split(":")[0] === t.split(":")[0]
      },
      addPath: function (r, t) {
        var n = r.split("?");
        return n[0] + t + (n[1] ? "?" + n[1] : "")
      },
      addQuery: function (r, t) {
        return r + (-1 === r.indexOf("?") ? "?" + t : "&" + t)
      }
    };
  }, {
    "url-parse": "WxRL"
  }],
  "oxw+": [function (require, module, exports) {
    "function" == typeof Object.create ? module.exports = function (t, e) {
      t.super_ = e, t.prototype = Object.create(e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })
    } : module.exports = function (t, e) {
      t.super_ = e;
      var o = function () {};
      o.prototype = e.prototype, t.prototype = new o, t.prototype.constructor = t
    };
  }, {}],
  "PUqX": [function (require, module, exports) {
    "use strict";

    function t() {
      this._listeners = {}
    }
    t.prototype.addEventListener = function (t, e) {
      t in this._listeners || (this._listeners[t] = []);
      var s = this._listeners[t]; - 1 === s.indexOf(e) && (s = s.concat([e])), this._listeners[t] = s
    }, t.prototype.removeEventListener = function (t, e) {
      var s = this._listeners[t];
      if (s) {
        var i = s.indexOf(e); - 1 === i || (s.length > 1 ? this._listeners[t] = s.slice(0, i).concat(s.slice(i + 1)) : delete this._listeners[t])
      }
    }, t.prototype.dispatchEvent = function () {
      var t = arguments[0],
        e = t.type,
        s = 1 === arguments.length ? [t] : Array.apply(null, arguments);
      if (this["on" + e] && this["on" + e].apply(this, s), e in this._listeners)
        for (var i = this._listeners[e], n = 0; n < i.length; n++) i[n].apply(this, s)
    }, module.exports = t;
  }, {}],
  "6GPx": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      t = require("./eventtarget");

    function r() {
      t.call(this)
    }
    e(r, t), r.prototype.removeAllListeners = function (e) {
      e ? delete this._listeners[e] : this._listeners = {}
    }, r.prototype.once = function (e, t) {
      var r = this,
        o = !1;
      this.on(e, function i() {
        r.removeListener(e, i), o || (o = !0, t.apply(this, arguments))
      })
    }, r.prototype.emit = function () {
      var e = arguments[0],
        t = this._listeners[e];
      if (t) {
        for (var r = arguments.length, o = new Array(r - 1), i = 1; i < r; i++) o[i - 1] = arguments[i];
        for (var n = 0; n < t.length; n++) t[n].apply(this, o)
      }
    }, r.prototype.on = r.prototype.addListener = t.prototype.addEventListener, r.prototype.removeListener = t.prototype.removeEventListener, module.exports.EventEmitter = r;
  }, {
    "inherits": "oxw+",
    "./eventtarget": "PUqX"
  }],
  "xNcg": [function (require, module, exports) {
    var global = arguments[3];
    var e = arguments[3],
      o = e.WebSocket || e.MozWebSocket;
    module.exports = o ? function (e) {
      return new o(e)
    } : void 0;
  }, {}],
  "c80l": [function (require, module, exports) {
    "use strict";
    var e = require("../utils/event"),
      s = require("../utils/url"),
      t = require("inherits"),
      n = require("events").EventEmitter,
      o = require("./driver/websocket"),
      r = function () {};

    function i(t, l, c) {
      if (!i.enabled()) throw new Error("Transport created when disabled");
      n.call(this), r("constructor", t);
      var u = this,
        a = s.addPath(t, "/websocket");
      a = "https" === a.slice(0, 5) ? "wss" + a.slice(5) : "ws" + a.slice(4), this.url = a, this.ws = new o(this.url, [], c), this.ws.onmessage = function (e) {
        r("message event", e.data), u.emit("message", e.data)
      }, this.unloadRef = e.unloadAdd(function () {
        r("unload"), u.ws.close()
      }), this.ws.onclose = function (e) {
        r("close event", e.code, e.reason), u.emit("close", e.code, e.reason), u._cleanup()
      }, this.ws.onerror = function (e) {
        r("error event", e), u.emit("close", 1006, "WebSocket connection broken"), u._cleanup()
      }
    }
    t(i, n), i.prototype.send = function (e) {
      var s = "[" + e + "]";
      r("send", s), this.ws.send(s)
    }, i.prototype.close = function () {
      r("close");
      var e = this.ws;
      this._cleanup(), e && e.close()
    }, i.prototype._cleanup = function () {
      r("_cleanup");
      var s = this.ws;
      s && (s.onmessage = s.onclose = s.onerror = null), e.unloadDel(this.unloadRef), this.unloadRef = this.ws = null, this.removeAllListeners()
    }, i.enabled = function () {
      return r("enabled"), !!o
    }, i.transportName = "websocket", i.roundTrips = 2, module.exports = i;
  }, {
    "../utils/event": "q8Q2",
    "../utils/url": "prkv",
    "inherits": "oxw+",
    "events": "6GPx",
    "./driver/websocket": "xNcg"
  }],
  "o1fQ": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      t = require("events").EventEmitter,
      n = function () {};

    function s(e, s) {
      n(e), t.call(this), this.sendBuffer = [], this.sender = s, this.url = e
    }
    e(s, t), s.prototype.send = function (e) {
      n("send", e), this.sendBuffer.push(e), this.sendStop || this.sendSchedule()
    }, s.prototype.sendScheduleWait = function () {
      n("sendScheduleWait");
      var e, t = this;
      this.sendStop = function () {
        n("sendStop"), t.sendStop = null, clearTimeout(e)
      }, e = setTimeout(function () {
        n("timeout"), t.sendStop = null, t.sendSchedule()
      }, 25)
    }, s.prototype.sendSchedule = function () {
      n("sendSchedule", this.sendBuffer.length);
      var e = this;
      if (this.sendBuffer.length > 0) {
        var t = "[" + this.sendBuffer.join(",") + "]";
        this.sendStop = this.sender(this.url, t, function (t) {
          e.sendStop = null, t ? (n("error", t), e.emit("close", t.code || 1006, "Sending error: " + t), e.close()) : e.sendScheduleWait()
        }), this.sendBuffer = []
      }
    }, s.prototype._cleanup = function () {
      n("_cleanup"), this.removeAllListeners()
    }, s.prototype.close = function () {
      n("close"), this._cleanup(), this.sendStop && (this.sendStop(), this.sendStop = null)
    }, module.exports = s;
  }, {
    "inherits": "oxw+",
    "events": "6GPx"
  }],
  "4XFA": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      s = require("events").EventEmitter,
      t = function () {};

    function i(e, i, l) {
      t(i), s.call(this), this.Receiver = e, this.receiveUrl = i, this.AjaxObject = l, this._scheduleReceiver()
    }
    e(i, s), i.prototype._scheduleReceiver = function () {
      t("_scheduleReceiver");
      var e = this,
        s = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
      s.on("message", function (s) {
        t("message", s), e.emit("message", s)
      }), s.once("close", function (i, l) {
        t("close", i, l, e.pollIsClosing), e.poll = s = null, e.pollIsClosing || ("network" === l ? e._scheduleReceiver() : (e.emit("close", i || 1006, l), e.removeAllListeners()))
      })
    }, i.prototype.abort = function () {
      t("abort"), this.removeAllListeners(), this.pollIsClosing = !0, this.poll && this.poll.abort()
    }, module.exports = i;
  }, {
    "inherits": "oxw+",
    "events": "6GPx"
  }],
  "sju2": [function (require, module, exports) {
    "use strict";
    var l = require("inherits"),
      e = require("../../utils/url"),
      o = require("./buffered-sender"),
      s = require("./polling"),
      t = function () {};

    function i(l, i, r, n, c) {
      var u = e.addPath(l, i);
      t(u);
      var p = this;
      o.call(this, l, r), this.poll = new s(n, u, c), this.poll.on("message", function (l) {
        t("poll message", l), p.emit("message", l)
      }), this.poll.once("close", function (l, e) {
        t("poll close", l, e), p.poll = null, p.emit("close", l, e), p.close()
      })
    }
    l(i, o), i.prototype.close = function () {
      o.prototype.close.call(this), t("close"), this.removeAllListeners(), this.poll && (this.poll.abort(), this.poll = null)
    }, module.exports = i;
  }, {
    "inherits": "oxw+",
    "../../utils/url": "prkv",
    "./buffered-sender": "o1fQ",
    "./polling": "4XFA"
  }],
  "h4sR": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      r = require("../../utils/url"),
      n = require("./sender-receiver"),
      t = function () {};

    function i(e) {
      return function (n, i, u) {
        t("create ajax sender", n, i);
        var o = {};
        "string" == typeof i && (o.headers = {
          "Content-type": "text/plain"
        });
        var s = r.addPath(n, "/xhr_send"),
          a = new e("POST", s, i, o);
        return a.once("finish", function (e) {
            if (t("finish", e), a = null, 200 !== e && 204 !== e) return u(new Error("http status " + e));
            u()
          }),
          function () {
            t("abort"), a.close(), a = null;
            var e = new Error("Aborted");
            e.code = 1e3, u(e)
          }
      }
    }

    function u(e, r, t, u) {
      n.call(this, e, r, i(u), t, u)
    }
    e(u, n), module.exports = u;
  }, {
    "inherits": "oxw+",
    "../../utils/url": "prkv",
    "./sender-receiver": "sju2"
  }],
  "kyBw": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      i = require("events").EventEmitter,
      n = function () {};

    function t(e, t) {
      n(e), i.call(this);
      var s = this;
      this.bufferPosition = 0, this.xo = new t("POST", e, null), this.xo.on("chunk", this._chunkHandler.bind(this)), this.xo.once("finish", function (e, i) {
        n("finish", e, i), s._chunkHandler(e, i), s.xo = null;
        var t = 200 === e ? "network" : "permanent";
        n("close", t), s.emit("close", null, t), s._cleanup()
      })
    }
    e(t, i), t.prototype._chunkHandler = function (e, i) {
      if (n("_chunkHandler", e), 200 === e && i)
        for (var t = -1;; this.bufferPosition += t + 1) {
          var s = i.slice(this.bufferPosition);
          if (-1 === (t = s.indexOf("\n"))) break;
          var o = s.slice(0, t);
          o && (n("message", o), this.emit("message", o))
        }
    }, t.prototype._cleanup = function () {
      n("_cleanup"), this.removeAllListeners()
    }, t.prototype.abort = function () {
      n("abort"), this.xo && (this.xo.close(), n("close"), this.emit("close", null, "user"), this.xo = null), this._cleanup()
    }, module.exports = t;
  }, {
    "inherits": "oxw+",
    "events": "6GPx"
  }],
  "TbCi": [function (require, module, exports) {
    var global = arguments[3];
    var t = arguments[3],
      e = require("events").EventEmitter,
      i = require("inherits"),
      n = require("../../utils/event"),
      r = require("../../utils/url"),
      s = t.XMLHttpRequest,
      h = function () {};

    function a(t, i, n, r) {
      h(t, i);
      var s = this;
      e.call(this), setTimeout(function () {
        s._start(t, i, n, r)
      }, 0)
    }
    i(a, e), a.prototype._start = function (t, e, i, u) {
      var o = this;
      try {
        this.xhr = new s
      } catch (l) {}
      if (!this.xhr) return h("no xhr"), this.emit("finish", 0, "no xhr support"), void this._cleanup();
      e = r.addQuery(e, "t=" + +new Date), this.unloadRef = n.unloadAdd(function () {
        h("unload cleanup"), o._cleanup(!0)
      });
      try {
        this.xhr.open(t, e, !0), this.timeout && "timeout" in this.xhr && (this.xhr.timeout = this.timeout, this.xhr.ontimeout = function () {
          h("xhr timeout"), o.emit("finish", 0, ""), o._cleanup(!1)
        })
      } catch (d) {
        return h("exception", d), this.emit("finish", 0, ""), void this._cleanup(!1)
      }
      if (u && u.noCredentials || !a.supportsCORS || (h("withCredentials"), this.xhr.withCredentials = !0), u && u.headers)
        for (var c in u.headers) this.xhr.setRequestHeader(c, u.headers[c]);
      this.xhr.onreadystatechange = function () {
        if (o.xhr) {
          var t, e, i = o.xhr;
          switch (h("readyState", i.readyState), i.readyState) {
            case 3:
              try {
                e = i.status, t = i.responseText
              } catch (d) {}
              h("status", e), 1223 === e && (e = 204), 200 === e && t && t.length > 0 && (h("chunk"), o.emit("chunk", e, t));
              break;
            case 4:
              e = i.status, h("status", e), 1223 === e && (e = 204), 12005 !== e && 12029 !== e || (e = 0), h("finish", e, i.responseText), o.emit("finish", e, i.responseText), o._cleanup(!1)
          }
        }
      };
      try {
        o.xhr.send(i)
      } catch (d) {
        o.emit("finish", 0, ""), o._cleanup(!1)
      }
    }, a.prototype._cleanup = function (t) {
      if (h("cleanup"), this.xhr) {
        if (this.removeAllListeners(), n.unloadDel(this.unloadRef), this.xhr.onreadystatechange = function () {}, this.xhr.ontimeout && (this.xhr.ontimeout = null), t) try {
          this.xhr.abort()
        } catch (e) {}
        this.unloadRef = this.xhr = null
      }
    }, a.prototype.close = function () {
      h("close"), this._cleanup(!0)
    }, a.enabled = !!s;
    var u = ["Active"].concat("Object").join("X");
    !a.enabled && u in t && (h("overriding xmlhttprequest"), s = function () {
      try {
        return new t[u]("Microsoft.XMLHTTP")
      } catch (e) {
        return null
      }
    }, a.enabled = !!new s);
    var o = !1;
    try {
      o = "withCredentials" in new s
    } catch (c) {}
    a.supportsCORS = o, module.exports = a;
  }, {
    "events": "6GPx",
    "inherits": "oxw+",
    "../../utils/event": "q8Q2",
    "../../utils/url": "prkv"
  }],
  "TBnt": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      r = require("../driver/xhr");

    function i(e, i, s, t) {
      r.call(this, e, i, s, t)
    }
    e(i, r), i.enabled = r.enabled && r.supportsCORS, module.exports = i;
  }, {
    "inherits": "oxw+",
    "../driver/xhr": "TbCi"
  }],
  "9mX/": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      r = require("../driver/xhr");

    function i(e, i, n) {
      r.call(this, e, i, n, {
        noCredentials: !0
      })
    }
    e(i, r), i.enabled = r.enabled, module.exports = i;
  }, {
    "inherits": "oxw+",
    "../driver/xhr": "TbCi"
  }],
  "+JeF": [function (require, module, exports) {
    var global = arguments[3];
    var r = arguments[3];
    module.exports = {
      isOpera: function () {
        return r.navigator && /opera/i.test(r.navigator.userAgent)
      },
      isKonqueror: function () {
        return r.navigator && /konqueror/i.test(r.navigator.userAgent)
      },
      hasDomain: function () {
        if (!r.document) return !0;
        try {
          return !!r.document.domain
        } catch (n) {
          return !1
        }
      }
    };
  }, {}],
  "a/LL": [function (require, module, exports) {
    var global = arguments[3];
    var e = arguments[3],
      r = require("inherits"),
      n = require("./lib/ajax-based"),
      i = require("./receiver/xhr"),
      a = require("./sender/xhr-cors"),
      s = require("./sender/xhr-local"),
      t = require("../utils/browser");

    function d(e) {
      if (!s.enabled && !a.enabled) throw new Error("Transport created when disabled");
      n.call(this, e, "/xhr_streaming", i, a)
    }
    r(d, n), d.enabled = function (e) {
      return !e.nullOrigin && (!t.isOpera() && a.enabled)
    }, d.transportName = "xhr-streaming", d.roundTrips = 2, d.needBody = !!e.document, module.exports = d;
  }, {
    "inherits": "oxw+",
    "./lib/ajax-based": "h4sR",
    "./receiver/xhr": "kyBw",
    "./sender/xhr-cors": "TBnt",
    "./sender/xhr-local": "9mX/",
    "../utils/browser": "+JeF"
  }],
  "VmyL": [function (require, module, exports) {
    var global = arguments[3];
    var t = arguments[3],
      e = require("events").EventEmitter,
      r = require("inherits"),
      o = require("../../utils/event"),
      i = require("../../utils/browser"),
      n = require("../../utils/url"),
      s = function () {};

    function u(t, r, o) {
      s(t, r);
      var i = this;
      e.call(this), setTimeout(function () {
        i._start(t, r, o)
      }, 0)
    }
    r(u, e), u.prototype._start = function (e, r, i) {
      s("_start");
      var u = this,
        a = new t.XDomainRequest;
      r = n.addQuery(r, "t=" + +new Date), a.onerror = function () {
        s("onerror"), u._error()
      }, a.ontimeout = function () {
        s("ontimeout"), u._error()
      }, a.onprogress = function () {
        s("progress", a.responseText), u.emit("chunk", 200, a.responseText)
      }, a.onload = function () {
        s("load"), u.emit("finish", 200, a.responseText), u._cleanup(!1)
      }, this.xdr = a, this.unloadRef = o.unloadAdd(function () {
        u._cleanup(!0)
      });
      try {
        this.xdr.open(e, r), this.timeout && (this.xdr.timeout = this.timeout), this.xdr.send(i)
      } catch (h) {
        this._error()
      }
    }, u.prototype._error = function () {
      this.emit("finish", 0, ""), this._cleanup(!1)
    }, u.prototype._cleanup = function (t) {
      if (s("cleanup", t), this.xdr) {
        if (this.removeAllListeners(), o.unloadDel(this.unloadRef), this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null, t) try {
          this.xdr.abort()
        } catch (e) {}
        this.unloadRef = this.xdr = null
      }
    }, u.prototype.close = function () {
      s("close"), this._cleanup(!0)
    }, u.enabled = !(!t.XDomainRequest || !i.hasDomain()), module.exports = u;
  }, {
    "events": "6GPx",
    "inherits": "oxw+",
    "../../utils/event": "q8Q2",
    "../../utils/browser": "+JeF",
    "../../utils/url": "prkv"
  }],
  "UfBN": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      r = require("./lib/ajax-based"),
      i = require("./receiver/xhr"),
      n = require("./sender/xdr");

    function a(e) {
      if (!n.enabled) throw new Error("Transport created when disabled");
      r.call(this, e, "/xhr_streaming", i, n)
    }
    e(a, r), a.enabled = function (e) {
      return !e.cookie_needed && !e.nullOrigin && (n.enabled && e.sameScheme)
    }, a.transportName = "xdr-streaming", a.roundTrips = 2, module.exports = a;
  }, {
    "inherits": "oxw+",
    "./lib/ajax-based": "h4sR",
    "./receiver/xhr": "kyBw",
    "./sender/xdr": "VmyL"
  }],
  "YxpD": [function (require, module, exports) {
    var global = arguments[3];
    var e = arguments[3];
    module.exports = e.EventSource;
  }, {}],
  "pVdQ": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      t = require("events").EventEmitter,
      r = require("eventsource"),
      n = function () {};

    function o(e) {
      n(e), t.call(this);
      var o = this,
        s = this.es = new r(e);
      s.onmessage = function (e) {
        n("message", e.data), o.emit("message", decodeURI(e.data))
      }, s.onerror = function (e) {
        n("error", s.readyState, e);
        var t = 2 !== s.readyState ? "network" : "permanent";
        o._cleanup(), o._close(t)
      }
    }
    e(o, t), o.prototype.abort = function () {
      n("abort"), this._cleanup(), this._close("user")
    }, o.prototype._cleanup = function () {
      n("cleanup");
      var e = this.es;
      e && (e.onmessage = e.onerror = null, e.close(), this.es = null)
    }, o.prototype._close = function (e) {
      n("close", e);
      var t = this;
      setTimeout(function () {
        t.emit("close", null, e), t.removeAllListeners()
      }, 200)
    }, module.exports = o;
  }, {
    "inherits": "oxw+",
    "events": "6GPx",
    "eventsource": "YxpD"
  }],
  "DuLI": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      r = require("./lib/ajax-based"),
      n = require("./receiver/eventsource"),
      t = require("./sender/xhr-cors"),
      i = require("eventsource");

    function s(e) {
      if (!s.enabled()) throw new Error("Transport created when disabled");
      r.call(this, e, "/eventsource", n, t)
    }
    e(s, r), s.enabled = function () {
      return !!i
    }, s.transportName = "eventsource", s.roundTrips = 2, module.exports = s;
  }, {
    "inherits": "oxw+",
    "./lib/ajax-based": "h4sR",
    "./receiver/eventsource": "pVdQ",
    "./sender/xhr-cors": "TBnt",
    "eventsource": "YxpD"
  }],
  "r5wZ": [function (require, module, exports) {
    var define;
    var global = arguments[3];
    var t, e = arguments[3];
    (function () {
      var r = "function" == typeof t && t.amd,
        n = {
          function: !0,
          object: !0
        },
        o = n[typeof exports] && exports && !exports.nodeType && exports,
        c = n[typeof window] && window || this,
        i = o && n[typeof module] && module && !module.nodeType && "object" == typeof e && e;

      function a(t, e) {
        t || (t = c.Object()), e || (e = c.Object());
        var r = t.Number || c.Number,
          o = t.String || c.String,
          i = t.Object || c.Object,
          l = t.Date || c.Date,
          f = t.SyntaxError || c.SyntaxError,
          u = t.TypeError || c.TypeError,
          s = t.Math || c.Math,
          h = t.JSON || c.JSON;
        "object" == typeof h && h && (e.stringify = h.stringify, e.parse = h.parse);
        var p, g, y, b = i.prototype,
          j = b.toString,
          d = new l(-0xc782b5b800cec);
        try {
          d = -109252 == d.getUTCFullYear() && 0 === d.getUTCMonth() && 1 === d.getUTCDate() && 10 == d.getUTCHours() && 37 == d.getUTCMinutes() && 6 == d.getUTCSeconds() && 708 == d.getUTCMilliseconds()
        } catch (P) {}

        function v(t) {
          if (v[t] !== y) return v[t];
          var n;
          if ("bug-string-char-index" == t) n = "a" != "a" [0];
          else if ("json" == t) n = v("json-stringify") && v("json-parse");
          else {
            var c, i = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
            if ("json-stringify" == t) {
              var a = e.stringify,
                f = "function" == typeof a && d;
              if (f) {
                (c = function () {
                  return 1
                }).toJSON = c;
                try {
                  f = "0" === a(0) && "0" === a(new r) && '""' == a(new o) && a(j) === y && a(y) === y && a() === y && "1" === a(c) && "[1]" == a([c]) && "[null]" == a([y]) && "null" == a(null) && "[null,null,null]" == a([y, j, null]) && a({
                    a: [c, !0, !1, null, "\0\b\n\f\r\t"]
                  }) == i && "1" === a(null, c) && "[\n 1,\n 2\n]" == a([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == a(new l(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == a(new l(864e13)) && '"-000001-01-01T00:00:00.000Z"' == a(new l(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == a(new l(-1))
                } catch (P) {
                  f = !1
                }
              }
              n = f
            }
            if ("json-parse" == t) {
              var u = e.parse;
              if ("function" == typeof u) try {
                if (0 === u("0") && !u(!1)) {
                  var s = 5 == (c = u(i)).a.length && 1 === c.a[0];
                  if (s) {
                    try {
                      s = !u('"\t"')
                    } catch (P) {}
                    if (s) try {
                      s = 1 !== u("01")
                    } catch (P) {}
                    if (s) try {
                      s = 1 !== u("1.")
                    } catch (P) {}
                  }
                }
              } catch (P) {
                s = !1
              }
              n = s
            }
          }
          return v[t] = !!n
        }
        if (!v("json")) {
          var C = v("bug-string-char-index");
          if (!d) var S = s.floor,
            O = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
            A = function (t, e) {
              return O[e] + 365 * (t - 1970) + S((t - 1969 + (e = +(e > 1))) / 4) - S((t - 1901 + e) / 100) + S((t - 1601 + e) / 400)
            };
          if ((p = b.hasOwnProperty) || (p = function (t) {
              var e, r = {};
              return (r.__proto__ = null, r.__proto__ = {
                toString: 1
              }, r).toString != j ? p = function (t) {
                var e = this.__proto__,
                  r = t in (this.__proto__ = null, this);
                return this.__proto__ = e, r
              } : (e = r.constructor, p = function (t) {
                var r = (this.constructor || e).prototype;
                return t in this && !(t in r && this[t] === r[t])
              }), r = null, p.call(this, t)
            }), g = function (t, e) {
              var r, o, c, i = 0;
              for (c in (r = function () {
                  this.valueOf = 0
                }).prototype.valueOf = 0, o = new r) p.call(o, c) && i++;
              return r = o = null, i ? g = 2 == i ? function (t, e) {
                var r, n = {},
                  o = "[object Function]" == j.call(t);
                for (r in t) o && "prototype" == r || p.call(n, r) || !(n[r] = 1) || !p.call(t, r) || e(r)
              } : function (t, e) {
                var r, n, o = "[object Function]" == j.call(t);
                for (r in t) o && "prototype" == r || !p.call(t, r) || (n = "constructor" === r) || e(r);
                (n || p.call(t, r = "constructor")) && e(r)
              } : (o = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], g = function (t, e) {
                var r, c, i = "[object Function]" == j.call(t),
                  a = !i && "function" != typeof t.constructor && n[typeof t.hasOwnProperty] && t.hasOwnProperty || p;
                for (r in t) i && "prototype" == r || !a.call(t, r) || e(r);
                for (c = o.length; r = o[--c]; a.call(t, r) && e(r));
              }), g(t, e)
            }, !v("json-stringify")) {
            var w = {
                92: "\\\\",
                34: '\\"',
                8: "\\b",
                12: "\\f",
                10: "\\n",
                13: "\\r",
                9: "\\t"
              },
              T = function (t, e) {
                return ("000000" + (e || 0)).slice(-t)
              },
              _ = function (t) {
                for (var e = '"', r = 0, n = t.length, o = !C || n > 10, c = o && (C ? t.split("") : t); r < n; r++) {
                  var i = t.charCodeAt(r);
                  switch (i) {
                    case 8:
                    case 9:
                    case 10:
                    case 12:
                    case 13:
                    case 34:
                    case 92:
                      e += w[i];
                      break;
                    default:
                      if (i < 32) {
                        e += "\\u00" + T(2, i.toString(16));
                        break
                      }
                      e += o ? c[r] : t.charAt(r)
                  }
                }
                return e + '"'
              },
              N = function (t, e, r, n, o, c, i) {
                var a, l, f, s, h, b, d, v, C, O, w, U, m, J, x, M;
                try {
                  a = e[t]
                } catch (P) {}
                if ("object" == typeof a && a)
                  if ("[object Date]" != (l = j.call(a)) || p.call(a, "toJSON")) "function" == typeof a.toJSON && ("[object Number]" != l && "[object String]" != l && "[object Array]" != l || p.call(a, "toJSON")) && (a = a.toJSON(t));
                  else if (a > -1 / 0 && a < 1 / 0) {
                  if (A) {
                    for (h = S(a / 864e5), f = S(h / 365.2425) + 1970 - 1; A(f + 1, 0) <= h; f++);
                    for (s = S((h - A(f, 0)) / 30.42); A(f, s + 1) <= h; s++);
                    h = 1 + h - A(f, s), d = S((b = (a % 864e5 + 864e5) % 864e5) / 36e5) % 24, v = S(b / 6e4) % 60, C = S(b / 1e3) % 60, O = b % 1e3
                  } else f = a.getUTCFullYear(), s = a.getUTCMonth(), h = a.getUTCDate(), d = a.getUTCHours(), v = a.getUTCMinutes(), C = a.getUTCSeconds(), O = a.getUTCMilliseconds();
                  a = (f <= 0 || f >= 1e4 ? (f < 0 ? "-" : "+") + T(6, f < 0 ? -f : f) : T(4, f)) + "-" + T(2, s + 1) + "-" + T(2, h) + "T" + T(2, d) + ":" + T(2, v) + ":" + T(2, C) + "." + T(3, O) + "Z"
                } else a = null;
                if (r && (a = r.call(e, t, a)), null === a) return "null";
                if ("[object Boolean]" == (l = j.call(a))) return "" + a;
                if ("[object Number]" == l) return a > -1 / 0 && a < 1 / 0 ? "" + a : "null";
                if ("[object String]" == l) return _("" + a);
                if ("object" == typeof a) {
                  for (J = i.length; J--;)
                    if (i[J] === a) throw u();
                  if (i.push(a), w = [], x = c, c += o, "[object Array]" == l) {
                    for (m = 0, J = a.length; m < J; m++) U = N(m, a, r, n, o, c, i), w.push(U === y ? "null" : U);
                    M = w.length ? o ? "[\n" + c + w.join(",\n" + c) + "\n" + x + "]" : "[" + w.join(",") + "]" : "[]"
                  } else g(n || a, function (t) {
                    var e = N(t, a, r, n, o, c, i);
                    e !== y && w.push(_(t) + ":" + (o ? " " : "") + e)
                  }), M = w.length ? o ? "{\n" + c + w.join(",\n" + c) + "\n" + x + "}" : "{" + w.join(",") + "}" : "{}";
                  return i.pop(), M
                }
              };
            e.stringify = function (t, e, r) {
              var o, c, i, a;
              if (n[typeof e] && e)
                if ("[object Function]" == (a = j.call(e))) c = e;
                else if ("[object Array]" == a) {
                i = {};
                for (var l, f = 0, u = e.length; f < u; l = e[f++], ("[object String]" == (a = j.call(l)) || "[object Number]" == a) && (i[l] = 1));
              }
              if (r)
                if ("[object Number]" == (a = j.call(r))) {
                  if ((r -= r % 1) > 0)
                    for (o = "", r > 10 && (r = 10); o.length < r; o += " ");
                } else "[object String]" == a && (o = r.length <= 10 ? r : r.slice(0, 10));
              return N("", ((l = {})[""] = t, l), c, i, o, "", [])
            }
          }
          if (!v("json-parse")) {
            var U, m, J = o.fromCharCode,
              x = {
                92: "\\",
                34: '"',
                47: "/",
                98: "\b",
                116: "\t",
                110: "\n",
                102: "\f",
                114: "\r"
              },
              M = function () {
                throw U = m = null, f()
              },
              F = function () {
                for (var t, e, r, n, o, c = m, i = c.length; U < i;) switch (o = c.charCodeAt(U)) {
                  case 9:
                  case 10:
                  case 13:
                  case 32:
                    U++;
                    break;
                  case 123:
                  case 125:
                  case 91:
                  case 93:
                  case 58:
                  case 44:
                    return t = C ? c.charAt(U) : c[U], U++, t;
                  case 34:
                    for (t = "@", U++; U < i;)
                      if ((o = c.charCodeAt(U)) < 32) M();
                      else if (92 == o) switch (o = c.charCodeAt(++U)) {
                      case 92:
                      case 34:
                      case 47:
                      case 98:
                      case 116:
                      case 110:
                      case 102:
                      case 114:
                        t += x[o], U++;
                        break;
                      case 117:
                        for (e = ++U, r = U + 4; U < r; U++)(o = c.charCodeAt(U)) >= 48 && o <= 57 || o >= 97 && o <= 102 || o >= 65 && o <= 70 || M();
                        t += J("0x" + c.slice(e, U));
                        break;
                      default:
                        M()
                    } else {
                      if (34 == o) break;
                      for (o = c.charCodeAt(U), e = U; o >= 32 && 92 != o && 34 != o;) o = c.charCodeAt(++U);
                      t += c.slice(e, U)
                    }
                    if (34 == c.charCodeAt(U)) return U++, t;
                    M();
                  default:
                    if (e = U, 45 == o && (n = !0, o = c.charCodeAt(++U)), o >= 48 && o <= 57) {
                      for (48 == o && ((o = c.charCodeAt(U + 1)) >= 48 && o <= 57) && M(), n = !1; U < i && ((o = c.charCodeAt(U)) >= 48 && o <= 57); U++);
                      if (46 == c.charCodeAt(U)) {
                        for (r = ++U; r < i && ((o = c.charCodeAt(r)) >= 48 && o <= 57); r++);
                        r == U && M(), U = r
                      }
                      if (101 == (o = c.charCodeAt(U)) || 69 == o) {
                        for (43 != (o = c.charCodeAt(++U)) && 45 != o || U++, r = U; r < i && ((o = c.charCodeAt(r)) >= 48 && o <= 57); r++);
                        r == U && M(), U = r
                      }
                      return +c.slice(e, U)
                    }
                    if (n && M(), "true" == c.slice(U, U + 4)) return U += 4, !0;
                    if ("false" == c.slice(U, U + 5)) return U += 5, !1;
                    if ("null" == c.slice(U, U + 4)) return U += 4, null;
                    M()
                }
                return "$"
              },
              k = function (t) {
                var e, r;
                if ("$" == t && M(), "string" == typeof t) {
                  if ("@" == (C ? t.charAt(0) : t[0])) return t.slice(1);
                  if ("[" == t) {
                    for (e = [];
                      "]" != (t = F()); r || (r = !0)) r && ("," == t ? "]" == (t = F()) && M() : M()), "," == t && M(), e.push(k(t));
                    return e
                  }
                  if ("{" == t) {
                    for (e = {};
                      "}" != (t = F()); r || (r = !0)) r && ("," == t ? "}" == (t = F()) && M() : M()), "," != t && "string" == typeof t && "@" == (C ? t.charAt(0) : t[0]) && ":" == F() || M(), e[t.slice(1)] = k(F());
                    return e
                  }
                  M()
                }
                return t
              },
              D = function (t, e, r) {
                var n = E(t, e, r);
                n === y ? delete t[e] : t[e] = n
              },
              E = function (t, e, r) {
                var n, o = t[e];
                if ("object" == typeof o && o)
                  if ("[object Array]" == j.call(o))
                    for (n = o.length; n--;) D(o, n, r);
                  else g(o, function (t) {
                    D(o, t, r)
                  });
                return r.call(t, e, o)
              };
            e.parse = function (t, e) {
              var r, n;
              return U = 0, m = "" + t, r = k(F()), "$" != F() && M(), U = m = null, e && "[object Function]" == j.call(e) ? E(((n = {})[""] = r, n), "", e) : r
            }
          }
        }
        return e.runInContext = a, e
      }
      if (!i || i.global !== i && i.window !== i && i.self !== i || (c = i), o && !r) a(c, o);
      else {
        var l = c.JSON,
          f = c.JSON3,
          u = !1,
          s = a(c, c.JSON3 = {
            noConflict: function () {
              return u || (u = !0, c.JSON = l, c.JSON3 = f, l = f = null), s
            }
          });
        c.JSON = {
          parse: s.parse,
          stringify: s.stringify
        }
      }
      r && t(function () {
        return s
      })
    }).call(this);
  }, {}],
  "A8Oj": [function (require, module, exports) {
    module.exports = "1.3.0";
  }, {}],
  "lHOv": [function (require, module, exports) {
    var global = arguments[3];
    var e = arguments[3],
      o = require("./event"),
      n = require("json3"),
      t = require("./browser"),
      r = function () {};
    module.exports = {
      WPrefix: "_jp",
      currentWindowId: null,
      polluteGlobalNamespace: function () {
        module.exports.WPrefix in e || (e[module.exports.WPrefix] = {})
      },
      postMessage: function (o, t) {
        e.parent !== e ? e.parent.postMessage(n.stringify({
          windowId: module.exports.currentWindowId,
          type: o,
          data: t || ""
        }), "*") : r("Cannot postMessage, no parent window.", o, t)
      },
      createIframe: function (n, t) {
        var i, u, a = e.document.createElement("iframe"),
          l = function () {
            r("unattach"), clearTimeout(i);
            try {
              a.onload = null
            } catch (e) {}
            a.onerror = null
          },
          c = function () {
            r("cleanup"), a && (l(), setTimeout(function () {
              a && a.parentNode.removeChild(a), a = null
            }, 0), o.unloadDel(u))
          },
          d = function (e) {
            r("onerror", e), a && (c(), t(e))
          };
        return a.src = n, a.style.display = "none", a.style.position = "absolute", a.onerror = function () {
          d("onerror")
        }, a.onload = function () {
          r("onload"), clearTimeout(i), i = setTimeout(function () {
            d("onload timeout")
          }, 2e3)
        }, e.document.body.appendChild(a), i = setTimeout(function () {
          d("timeout")
        }, 15e3), u = o.unloadAdd(c), {
          post: function (e, o) {
            r("post", e, o), setTimeout(function () {
              try {
                a && a.contentWindow && a.contentWindow.postMessage(e, o)
              } catch (n) {}
            }, 0)
          },
          cleanup: c,
          loaded: l
        }
      },
      createHtmlfile: function (n, t) {
        var i, u, a, l = ["Active"].concat("Object").join("X"),
          c = new e[l]("htmlfile"),
          d = function () {
            clearTimeout(i), a.onerror = null
          },
          s = function () {
            c && (d(), o.unloadDel(u), a.parentNode.removeChild(a), a = c = null, CollectGarbage())
          },
          p = function (e) {
            r("onerror", e), c && (s(), t(e))
          };
        c.open(), c.write('<html><script>document.domain="' + e.document.domain + '";<\/script></html>'), c.close(), c.parentWindow[module.exports.WPrefix] = e[module.exports.WPrefix];
        var m = c.createElement("div");
        return c.body.appendChild(m), a = c.createElement("iframe"), m.appendChild(a), a.src = n, a.onerror = function () {
          p("onerror")
        }, i = setTimeout(function () {
          p("timeout")
        }, 15e3), u = o.unloadAdd(s), {
          post: function (e, o) {
            try {
              setTimeout(function () {
                a && a.contentWindow && a.contentWindow.postMessage(e, o)
              }, 0)
            } catch (n) {}
          },
          cleanup: s,
          loaded: d
        }
      }
    }, module.exports.iframeEnabled = !1, e.document && (module.exports.iframeEnabled = ("function" == typeof e.postMessage || "object" == typeof e.postMessage) && !t.isKonqueror());
  }, {
    "./event": "q8Q2",
    "json3": "r5wZ",
    "./browser": "+JeF"
  }],
  "B5iP": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      i = require("json3"),
      s = require("events").EventEmitter,
      t = require("../version"),
      a = require("../utils/url"),
      r = require("../utils/iframe"),
      n = require("../utils/event"),
      o = require("../utils/random"),
      h = function () {};

    function d(e, i, t) {
      if (!d.enabled()) throw new Error("Transport created when disabled");
      s.call(this);
      var l = this;
      this.origin = a.getOrigin(t), this.baseUrl = t, this.transUrl = i, this.transport = e, this.windowId = o.string(8);
      var c = a.addPath(t, "/iframe.html") + "#" + this.windowId;
      h(e, i, c), this.iframeObj = r.createIframe(c, function (e) {
        h("err callback"), l.emit("close", 1006, "Unable to load an iframe (" + e + ")"), l.close()
      }), this.onmessageCallback = this._message.bind(this), n.attachEvent("message", this.onmessageCallback)
    }
    e(d, s), d.prototype.close = function () {
      if (h("close"), this.removeAllListeners(), this.iframeObj) {
        n.detachEvent("message", this.onmessageCallback);
        try {
          this.postMessage("c")
        } catch (e) {}
        this.iframeObj.cleanup(), this.iframeObj = null, this.onmessageCallback = this.iframeObj = null
      }
    }, d.prototype._message = function (e) {
      if (h("message", e.data), a.isOriginEqual(e.origin, this.origin)) {
        var s;
        try {
          s = i.parse(e.data)
        } catch (n) {
          return void h("bad json", e.data)
        }
        if (s.windowId === this.windowId) switch (s.type) {
          case "s":
            this.iframeObj.loaded(), this.postMessage("s", i.stringify([t, this.transport, this.transUrl, this.baseUrl]));
            break;
          case "t":
            this.emit("message", s.data);
            break;
          case "c":
            var r;
            try {
              r = i.parse(s.data)
            } catch (n) {
              return void h("bad json", s.data)
            }
            this.emit("close", r[0], r[1]), this.close()
        } else h("mismatched window id", s.windowId, this.windowId)
      } else h("not same origin", e.origin, this.origin)
    }, d.prototype.postMessage = function (e, s) {
      h("postMessage", e, s), this.iframeObj.post(i.stringify({
        windowId: this.windowId,
        type: e,
        data: s || ""
      }), this.origin)
    }, d.prototype.send = function (e) {
      h("send", e), this.postMessage("m", e)
    }, d.enabled = function () {
      return r.iframeEnabled
    }, d.transportName = "iframe", d.roundTrips = 2, module.exports = d;
  }, {
    "inherits": "oxw+",
    "json3": "r5wZ",
    "events": "6GPx",
    "../version": "A8Oj",
    "../utils/url": "prkv",
    "../utils/iframe": "lHOv",
    "../utils/event": "q8Q2",
    "../utils/random": "kvjH"
  }],
  "ykCA": [function (require, module, exports) {
    "use strict";
    module.exports = {
      isObject: function (t) {
        var e = typeof t;
        return "function" === e || "object" === e && !!t
      },
      extend: function (t) {
        if (!this.isObject(t)) return t;
        for (var e, r, n = 1, o = arguments.length; n < o; n++)
          for (r in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t
      }
    };
  }, {}],
  "XHhf": [function (require, module, exports) {
    var global = arguments[3];
    var r = arguments[3],
      e = require("inherits"),
      n = require("../iframe"),
      t = require("../../utils/object");
    module.exports = function (a) {
      function i(r, e) {
        n.call(this, a.transportName, r, e)
      }
      return e(i, n), i.enabled = function (e, i) {
        if (!r.document) return !1;
        var u = t.extend({}, i);
        return u.sameOrigin = !0, a.enabled(u) && n.enabled()
      }, i.transportName = "iframe-" + a.transportName, i.needBody = !0, i.roundTrips = n.roundTrips + a.roundTrips - 1, i.facadeTransport = a, i
    };
  }, {
    "inherits": "oxw+",
    "../iframe": "B5iP",
    "../../utils/object": "ykCA"
  }],
  "4eIr": [function (require, module, exports) {
    var global = arguments[3];
    var e = arguments[3],
      t = require("inherits"),
      i = require("../../utils/iframe"),
      l = require("../../utils/url"),
      n = require("events").EventEmitter,
      a = require("../../utils/random"),
      r = function () {};

    function s(t) {
      r(t), n.call(this);
      var o = this;
      i.polluteGlobalNamespace(), this.id = "a" + a.string(6), t = l.addQuery(t, "c=" + decodeURIComponent(i.WPrefix + "." + this.id)), r("using htmlfile", s.htmlfileEnabled);
      var c = s.htmlfileEnabled ? i.createHtmlfile : i.createIframe;
      e[i.WPrefix][this.id] = {
        start: function () {
          r("start"), o.iframeObj.loaded()
        },
        message: function (e) {
          r("message", e), o.emit("message", e)
        },
        stop: function () {
          r("stop"), o._cleanup(), o._close("network")
        }
      }, this.iframeObj = c(t, function () {
        r("callback"), o._cleanup(), o._close("permanent")
      })
    }
    t(s, n), s.prototype.abort = function () {
      r("abort"), this._cleanup(), this._close("user")
    }, s.prototype._cleanup = function () {
      r("_cleanup"), this.iframeObj && (this.iframeObj.cleanup(), this.iframeObj = null), delete e[i.WPrefix][this.id]
    }, s.prototype._close = function (e) {
      r("_close", e), this.emit("close", null, e), this.removeAllListeners()
    }, s.htmlfileEnabled = !1;
    var o = ["Active"].concat("Object").join("X");
    if (o in e) try {
      s.htmlfileEnabled = !!new e[o]("htmlfile")
    } catch (c) {}
    s.enabled = s.htmlfileEnabled || i.iframeEnabled, module.exports = s;
  }, {
    "inherits": "oxw+",
    "../../utils/iframe": "lHOv",
    "../../utils/url": "prkv",
    "events": "6GPx",
    "../../utils/random": "kvjH"
  }],
  "+TEV": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      r = require("./receiver/htmlfile"),
      i = require("./sender/xhr-local"),
      l = require("./lib/ajax-based");

    function n(e) {
      if (!r.enabled) throw new Error("Transport created when disabled");
      l.call(this, e, "/htmlfile", r, i)
    }
    e(n, l), n.enabled = function (e) {
      return r.enabled && e.sameOrigin
    }, n.transportName = "htmlfile", n.roundTrips = 2, module.exports = n;
  }, {
    "inherits": "oxw+",
    "./receiver/htmlfile": "4eIr",
    "./sender/xhr-local": "9mX/",
    "./lib/ajax-based": "h4sR"
  }],
  "G9AK": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      r = require("./lib/ajax-based"),
      n = require("./receiver/xhr"),
      i = require("./sender/xhr-cors"),
      a = require("./sender/xhr-local");

    function l(e) {
      if (!a.enabled && !i.enabled) throw new Error("Transport created when disabled");
      r.call(this, e, "/xhr", n, i)
    }
    e(l, r), l.enabled = function (e) {
      return !e.nullOrigin && (!(!a.enabled || !e.sameOrigin) || i.enabled)
    }, l.transportName = "xhr-polling", l.roundTrips = 2, module.exports = l;
  }, {
    "inherits": "oxw+",
    "./lib/ajax-based": "h4sR",
    "./receiver/xhr": "kyBw",
    "./sender/xhr-cors": "TBnt",
    "./sender/xhr-local": "9mX/"
  }],
  "GwrO": [function (require, module, exports) {
    "use strict";
    var r = require("inherits"),
      e = require("./lib/ajax-based"),
      i = require("./xdr-streaming"),
      a = require("./receiver/xhr"),
      n = require("./sender/xdr");

    function d(r) {
      if (!n.enabled) throw new Error("Transport created when disabled");
      e.call(this, r, "/xhr", a, n)
    }
    r(d, e), d.enabled = i.enabled, d.transportName = "xdr-polling", d.roundTrips = 2, module.exports = d;
  }, {
    "inherits": "oxw+",
    "./lib/ajax-based": "h4sR",
    "./xdr-streaming": "UfBN",
    "./receiver/xhr": "kyBw",
    "./sender/xdr": "VmyL"
  }],
  "nruP": [function (require, module, exports) {
    var global = arguments[3];
    var t = arguments[3],
      e = require("../../utils/iframe"),
      r = require("../../utils/random"),
      i = require("../../utils/browser"),
      o = require("../../utils/url"),
      a = require("inherits"),
      s = require("events").EventEmitter,
      n = function () {};

    function c(i) {
      n(i);
      var a = this;
      s.call(this), e.polluteGlobalNamespace(), this.id = "a" + r.string(6);
      var l = o.addQuery(i, "c=" + encodeURIComponent(e.WPrefix + "." + this.id));
      t[e.WPrefix][this.id] = this._callback.bind(this), this._createScript(l), this.timeoutId = setTimeout(function () {
        n("timeout"), a._abort(new Error("JSONP script loaded abnormally (timeout)"))
      }, c.timeout)
    }
    a(c, s), c.prototype.abort = function () {
      if (n("abort"), t[e.WPrefix][this.id]) {
        var r = new Error("JSONP user aborted read");
        r.code = 1e3, this._abort(r)
      }
    }, c.timeout = 35e3, c.scriptErrorTimeout = 1e3, c.prototype._callback = function (t) {
      n("_callback", t), this._cleanup(), this.aborting || (t && (n("message", t), this.emit("message", t)), this.emit("close", null, "network"), this.removeAllListeners())
    }, c.prototype._abort = function (t) {
      n("_abort", t), this._cleanup(), this.aborting = !0, this.emit("close", t.code, t.message), this.removeAllListeners()
    }, c.prototype._cleanup = function () {
      if (n("_cleanup"), clearTimeout(this.timeoutId), this.script2 && (this.script2.parentNode.removeChild(this.script2), this.script2 = null), this.script) {
        var r = this.script;
        r.parentNode.removeChild(r), r.onreadystatechange = r.onerror = r.onload = r.onclick = null, this.script = null
      }
      delete t[e.WPrefix][this.id]
    }, c.prototype._scriptError = function () {
      n("_scriptError");
      var t = this;
      this.errorTimer || (this.errorTimer = setTimeout(function () {
        t.loadedOkay || t._abort(new Error("JSONP script loaded abnormally (onerror)"))
      }, c.scriptErrorTimeout))
    }, c.prototype._createScript = function (e) {
      n("_createScript", e);
      var o, a = this,
        s = this.script = t.document.createElement("script");
      if (s.id = "a" + r.string(8), s.src = e, s.type = "text/javascript", s.charset = "UTF-8", s.onerror = this._scriptError.bind(this), s.onload = function () {
          n("onload"), a._abort(new Error("JSONP script loaded abnormally (onload)"))
        }, s.onreadystatechange = function () {
          if (n("onreadystatechange", s.readyState), /loaded|closed/.test(s.readyState)) {
            if (s && s.htmlFor && s.onclick) {
              a.loadedOkay = !0;
              try {
                s.onclick()
              } catch (t) {}
            }
            s && a._abort(new Error("JSONP script loaded abnormally (onreadystatechange)"))
          }
        }, void 0 === s.async && t.document.attachEvent)
        if (i.isOpera())(o = this.script2 = t.document.createElement("script")).text = "try{var a = document.getElementById('" + s.id + "'); if(a)a.onerror();}catch(x){};", s.async = o.async = !1;
        else {
          try {
            s.htmlFor = s.id, s.event = "onclick"
          } catch (l) {}
          s.async = !0
        } void 0 !== s.async && (s.async = !0);
      var c = t.document.getElementsByTagName("head")[0];
      c.insertBefore(s, c.firstChild), o && c.insertBefore(o, c.firstChild)
    }, module.exports = c;
  }, {
    "../../utils/iframe": "lHOv",
    "../../utils/random": "kvjH",
    "../../utils/browser": "+JeF",
    "../../utils/url": "prkv",
    "inherits": "oxw+",
    "events": "6GPx"
  }],
  "76uW": [function (require, module, exports) {
    var global = arguments[3];
    var e, n, t = arguments[3],
      r = require("../../utils/random"),
      a = require("../../utils/url"),
      o = function () {};

    function d(e) {
      o("createIframe", e);
      try {
        return t.document.createElement('<iframe name="' + e + '">')
      } catch (r) {
        var n = t.document.createElement("iframe");
        return n.name = e, n
      }
    }

    function c() {
      o("createForm"), (e = t.document.createElement("form")).style.display = "none", e.style.position = "absolute", e.method = "POST", e.enctype = "application/x-www-form-urlencoded", e.acceptCharset = "UTF-8", (n = t.document.createElement("textarea")).name = "d", e.appendChild(n), t.document.body.appendChild(e)
    }
    module.exports = function (t, u, i) {
      o(t, u), e || c();
      var l = "a" + r.string(8);
      e.target = l, e.action = a.addQuery(a.addPath(t, "/jsonp_send"), "i=" + l);
      var m = d(l);
      m.id = l, m.style.display = "none", e.appendChild(m);
      try {
        n.value = u
      } catch (p) {}
      e.submit();
      var s = function (e) {
        o("completed", l, e), m.onerror && (m.onreadystatechange = m.onerror = m.onload = null, setTimeout(function () {
          o("cleaning up", l), m.parentNode.removeChild(m), m = null
        }, 500), n.value = "", i(e))
      };
      return m.onerror = function () {
          o("onerror", l), s()
        }, m.onload = function () {
          o("onload", l), s()
        }, m.onreadystatechange = function (e) {
          o("onreadystatechange", l, m.readyState, e), "complete" === m.readyState && s()
        },
        function () {
          o("aborted", l), s(new Error("Aborted"))
        }
    };
  }, {
    "../../utils/random": "kvjH",
    "../../utils/url": "prkv"
  }],
  "hI9h": [function (require, module, exports) {
    var global = arguments[3];
    var e = arguments[3],
      r = require("inherits"),
      n = require("./lib/sender-receiver"),
      i = require("./receiver/jsonp"),
      o = require("./sender/jsonp");

    function s(e) {
      if (!s.enabled()) throw new Error("Transport created when disabled");
      n.call(this, e, "/jsonp", o, i)
    }
    r(s, n), s.enabled = function () {
      return !!e.document
    }, s.transportName = "jsonp-polling", s.roundTrips = 1, s.needBody = !0, module.exports = s;
  }, {
    "inherits": "oxw+",
    "./lib/sender-receiver": "sju2",
    "./receiver/jsonp": "nruP",
    "./sender/jsonp": "76uW"
  }],
  "jVqY": [function (require, module, exports) {
    "use strict";
    module.exports = [require("./transport/websocket"), require("./transport/xhr-streaming"), require("./transport/xdr-streaming"), require("./transport/eventsource"), require("./transport/lib/iframe-wrap")(require("./transport/eventsource")), require("./transport/htmlfile"), require("./transport/lib/iframe-wrap")(require("./transport/htmlfile")), require("./transport/xhr-polling"), require("./transport/xdr-polling"), require("./transport/lib/iframe-wrap")(require("./transport/xhr-polling")), require("./transport/jsonp-polling")];
  }, {
    "./transport/websocket": "c80l",
    "./transport/xhr-streaming": "a/LL",
    "./transport/xdr-streaming": "UfBN",
    "./transport/eventsource": "DuLI",
    "./transport/lib/iframe-wrap": "XHhf",
    "./transport/htmlfile": "+TEV",
    "./transport/xhr-polling": "G9AK",
    "./transport/xdr-polling": "GwrO",
    "./transport/jsonp-polling": "hI9h"
  }],
  "+ldi": [function (require, module, exports) {
    "use strict";
    var t, n = Array.prototype,
      e = Object.prototype,
      r = Function.prototype,
      i = String.prototype,
      o = n.slice,
      l = e.toString,
      c = function (t) {
        return "[object Function]" === e.toString.call(t)
      },
      a = function (t) {
        return "[object Array]" === l.call(t)
      },
      u = function (t) {
        return "[object String]" === l.call(t)
      },
      s = Object.defineProperty && function () {
        try {
          return Object.defineProperty({}, "x", {}), !0
        } catch (t) {
          return !1
        }
      }();
    t = s ? function (t, n, e, r) {
      !r && n in t || Object.defineProperty(t, n, {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: e
      })
    } : function (t, n, e, r) {
      !r && n in t || (t[n] = e)
    };
    var p = function (n, r, i) {
        for (var o in r) e.hasOwnProperty.call(r, o) && t(n, o, r[o], i)
      },
      h = function (t) {
        if (null == t) throw new TypeError("can't convert " + t + " to object");
        return Object(t)
      };

    function f(t) {
      var n = +t;
      return n != n ? n = 0 : 0 !== n && n !== 1 / 0 && n !== -1 / 0 && (n = (n > 0 || -1) * Math.floor(Math.abs(n))), n
    }

    function g(t) {
      return t >>> 0
    }

    function y() {}
    p(r, {
      bind: function (t) {
        var n = this;
        if (!c(n)) throw new TypeError("Function.prototype.bind called on incompatible " + n);
        for (var e = o.call(arguments, 1), r = Math.max(0, n.length - e.length), i = [], l = 0; l < r; l++) i.push("$" + l);
        var a = Function("binder", "return function (" + i.join(",") + "){ return binder.apply(this, arguments); }")(function () {
          if (this instanceof a) {
            var r = n.apply(this, e.concat(o.call(arguments)));
            return Object(r) === r ? r : this
          }
          return n.apply(t, e.concat(o.call(arguments)))
        });
        return n.prototype && (y.prototype = n.prototype, a.prototype = new y, y.prototype = null), a
      }
    }), p(Array, {
      isArray: a
    });
    var b = Object("a"),
      v = "a" !== b[0] || !(0 in b),
      d = function (t) {
        var n = !0,
          e = !0;
        return t && (t.call("foo", function (t, e, r) {
          "object" != typeof r && (n = !1)
        }), t.call([1], function () {
          e = "string" == typeof this
        }, "x")), !!t && n && e
      };
    p(n, {
      forEach: function (t) {
        var n = h(this),
          e = v && u(this) ? this.split("") : n,
          r = arguments[1],
          i = -1,
          o = e.length >>> 0;
        if (!c(t)) throw new TypeError;
        for (; ++i < o;) i in e && t.call(r, e[i], i, n)
      }
    }, !d(n.forEach));
    var x = Array.prototype.indexOf && -1 !== [0, 1].indexOf(1, 2);
    p(n, {
      indexOf: function (t) {
        var n = v && u(this) ? this.split("") : h(this),
          e = n.length >>> 0;
        if (!e) return -1;
        var r = 0;
        for (arguments.length > 1 && (r = f(arguments[1])), r = r >= 0 ? r : Math.max(0, e + r); r < e; r++)
          if (r in n && n[r] === t) return r;
        return -1
      }
    }, x);
    var j = i.split;
    2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? function () {
      var t = void 0 === /()??/.exec("")[1];
      i.split = function (e, r) {
        var i = this;
        if (void 0 === e && 0 === r) return [];
        if ("[object RegExp]" !== l.call(e)) return j.call(this, e, r);
        var o, c, a, u, s = [],
          p = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.extended ? "x" : "") + (e.sticky ? "y" : ""),
          h = 0;
        for (e = new RegExp(e.source, p + "g"), i += "", t || (o = new RegExp("^" + e.source + "$(?!\\s)", p)), r = void 0 === r ? -1 >>> 0 : g(r);
          (c = e.exec(i)) && !((a = c.index + c[0].length) > h && (s.push(i.slice(h, c.index)), !t && c.length > 1 && c[0].replace(o, function () {
            for (var t = 1; t < arguments.length - 2; t++) void 0 === arguments[t] && (c[t] = void 0)
          }), c.length > 1 && c.index < i.length && n.push.apply(s, c.slice(1)), u = c[0].length, h = a, s.length >= r));) e.lastIndex === c.index && e.lastIndex++;
        return h === i.length ? !u && e.test("") || s.push("") : s.push(i.slice(h)), s.length > r ? s.slice(0, r) : s
      }
    }() : "0".split(void 0, 0).length && (i.split = function (t, n) {
      return void 0 === t && 0 === n ? [] : j.call(this, t, n)
    });
    var w = i.substr,
      O = "".substr && "b" !== "0b".substr(-1);
    p(i, {
      substr: function (t, n) {
        return w.call(this, t < 0 && (t = this.length + t) < 0 ? 0 : t, n)
      }
    }, O);
  }, {}],
  "80l2": [function (require, module, exports) {
    "use strict";
    var u, f = require("json3"),
      a = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,
      e = function (u) {
        var f, a = {},
          e = [];
        for (f = 0; f < 65536; f++) e.push(String.fromCharCode(f));
        return u.lastIndex = 0, e.join("").replace(u, function (u) {
          return a[u] = "\\u" + ("0000" + u.charCodeAt(0).toString(16)).slice(-4), ""
        }), u.lastIndex = 0, a
      };
    module.exports = {
      quote: function (d) {
        var b = f.stringify(d);
        return a.lastIndex = 0, a.test(b) ? (u || (u = e(a)), b.replace(a, function (f) {
          return u[f]
        })) : b
      }
    };
  }, {
    "json3": "r5wZ"
  }],
  "3t+s": [function (require, module, exports) {
    "use strict";
    var e = function () {};
    module.exports = function (t) {
      return {
        filterToEnabled: function (a, r) {
          var n = {
            main: [],
            facade: []
          };
          return a ? "string" == typeof a && (a = [a]) : a = [], t.forEach(function (t) {
            t && ("websocket" !== t.transportName || !1 !== r.websocket ? a.length && -1 === a.indexOf(t.transportName) ? e("not in whitelist", t.transportName) : t.enabled(r) ? (e("enabled", t.transportName), n.main.push(t), t.facadeTransport && n.facade.push(t.facadeTransport)) : e("disabled", t.transportName) : e("disabled from server", "websocket"))
          }), n
        }
      }
    };
  }, {}],
  "YVir": [function (require, module, exports) {
    var global = arguments[3];
    var o = arguments[3],
      n = {};
    ["log", "debug", "warn"].forEach(function (c) {
      var l;
      try {
        l = o.console && o.console[c] && o.console[c].apply
      } catch (e) {}
      n[c] = l ? function () {
        return o.console[c].apply(o.console, arguments)
      } : "log" === c ? function () {} : n.log
    }), module.exports = n;
  }, {}],
  "Vudx": [function (require, module, exports) {
    "use strict";

    function t(t) {
      this.type = t
    }
    t.prototype.initEvent = function (t, e, i) {
      return this.type = t, this.bubbles = e, this.cancelable = i, this.timeStamp = +new Date, this
    }, t.prototype.stopPropagation = function () {}, t.prototype.preventDefault = function () {}, t.CAPTURING_PHASE = 1, t.AT_TARGET = 2, t.BUBBLING_PHASE = 3, module.exports = t;
  }, {}],
  "sN6f": [function (require, module, exports) {
    var global = arguments[3];
    var o = arguments[3];
    module.exports = o.location || {
      origin: "http://localhost:80",
      protocol: "http:",
      host: "localhost",
      port: 80,
      href: "http://localhost/",
      hash: ""
    };
  }, {}],
  "Ry1i": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      i = require("./event");

    function t() {
      i.call(this), this.initEvent("close", !1, !1), this.wasClean = !1, this.code = 0, this.reason = ""
    }
    e(t, i), module.exports = t;
  }, {
    "inherits": "oxw+",
    "./event": "Vudx"
  }],
  "/fK0": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      t = require("./event");

    function i(e) {
      t.call(this), this.initEvent("message", !1, !1), this.data = e
    }
    e(i, t), module.exports = i;
  }, {
    "inherits": "oxw+",
    "./event": "Vudx"
  }],
  "950Q": [function (require, module, exports) {
    "use strict";
    var t = require("events").EventEmitter,
      e = require("inherits");

    function i() {
      var e = this;
      t.call(this), this.to = setTimeout(function () {
        e.emit("finish", 200, "{}")
      }, i.timeout)
    }
    e(i, t), i.prototype.close = function () {
      clearTimeout(this.to)
    }, i.timeout = 2e3, module.exports = i;
  }, {
    "events": "6GPx",
    "inherits": "oxw+"
  }],
  "2IH9": [function (require, module, exports) {
    "use strict";
    var e = require("events").EventEmitter,
      t = require("inherits"),
      i = require("json3"),
      s = require("./utils/object"),
      r = function () {};

    function n(t, n) {
      e.call(this);
      var o = this,
        c = +new Date;
      this.xo = new n("GET", t), this.xo.once("finish", function (e, t) {
        var n, u;
        if (200 === e) {
          if (u = +new Date - c, t) try {
            n = i.parse(t)
          } catch (h) {
            r("bad json", t)
          }
          s.isObject(n) || (n = {})
        }
        o.emit("finish", n, u), o.removeAllListeners()
      })
    }
    t(n, e), n.prototype.close = function () {
      this.removeAllListeners(), this.xo.close()
    }, module.exports = n;
  }, {
    "events": "6GPx",
    "inherits": "oxw+",
    "json3": "r5wZ",
    "./utils/object": "ykCA"
  }],
  "bZ+U": [function (require, module, exports) {
    "use strict";
    var e = require("inherits"),
      i = require("events").EventEmitter,
      r = require("json3"),
      t = require("./transport/sender/xhr-local"),
      s = require("./info-ajax");

    function n(e) {
      var n = this;
      i.call(this), this.ir = new s(e, t), this.ir.once("finish", function (e, i) {
        n.ir = null, n.emit("message", r.stringify([e, i]))
      })
    }
    e(n, i), n.transportName = "iframe-info-receiver", n.prototype.close = function () {
      this.ir && (this.ir.close(), this.ir = null), this.removeAllListeners()
    }, module.exports = n;
  }, {
    "inherits": "oxw+",
    "events": "6GPx",
    "json3": "r5wZ",
    "./transport/sender/xhr-local": "9mX/",
    "./info-ajax": "2IH9"
  }],
  "/v8/": [function (require, module, exports) {
    var global = arguments[3];
    var e = arguments[3],
      i = require("events").EventEmitter,
      r = require("inherits"),
      t = require("json3"),
      n = require("./utils/event"),
      o = require("./transport/iframe"),
      s = require("./info-iframe-receiver"),
      a = function () {};

    function c(r, c) {
      var u = this;
      i.call(this);
      var f = function () {
        var e = u.ifr = new o(s.transportName, c, r);
        e.once("message", function (e) {
          if (e) {
            var i;
            try {
              i = t.parse(e)
            } catch (o) {
              return a("bad json", e), u.emit("finish"), void u.close()
            }
            var r = i[0],
              n = i[1];
            u.emit("finish", r, n)
          }
          u.close()
        }), e.once("close", function () {
          u.emit("finish"), u.close()
        })
      };
      e.document.body ? f() : n.attachEvent("load", f)
    }
    r(c, i), c.enabled = function () {
      return o.enabled()
    }, c.prototype.close = function () {
      this.ifr && this.ifr.close(), this.removeAllListeners(), this.ifr = null
    }, module.exports = c;
  }, {
    "events": "6GPx",
    "inherits": "oxw+",
    "json3": "r5wZ",
    "./utils/event": "q8Q2",
    "./transport/iframe": "B5iP",
    "./info-iframe-receiver": "bZ+U"
  }],
  "cXIc": [function (require, module, exports) {
    "use strict";
    var e = require("events").EventEmitter,
      t = require("inherits"),
      i = require("./utils/url"),
      r = require("./transport/sender/xdr"),
      n = require("./transport/sender/xhr-cors"),
      o = require("./transport/sender/xhr-local"),
      s = require("./transport/sender/xhr-fake"),
      u = require("./info-iframe"),
      a = require("./info-ajax"),
      c = function () {};

    function h(t, i) {
      c(t);
      var r = this;
      e.call(this), setTimeout(function () {
        r.doXhr(t, i)
      }, 0)
    }
    t(h, e), h._getReceiver = function (e, t, i) {
      return i.sameOrigin ? new a(t, o) : n.enabled ? new a(t, n) : r.enabled && i.sameScheme ? new a(t, r) : u.enabled() ? new u(e, t) : new a(t, s)
    }, h.prototype.doXhr = function (e, t) {
      var r = this,
        n = i.addPath(e, "/info");
      c("doXhr", n), this.xo = h._getReceiver(e, n, t), this.timeoutRef = setTimeout(function () {
        c("timeout"), r._cleanup(!1), r.emit("finish")
      }, h.timeout), this.xo.once("finish", function (e, t) {
        c("finish", e, t), r._cleanup(!0), r.emit("finish", e, t)
      })
    }, h.prototype._cleanup = function (e) {
      c("_cleanup"), clearTimeout(this.timeoutRef), this.timeoutRef = null, !e && this.xo && this.xo.close(), this.xo = null
    }, h.prototype.close = function () {
      c("close"), this.removeAllListeners(), this._cleanup(!1)
    }, h.timeout = 8e3, module.exports = h;
  }, {
    "events": "6GPx",
    "inherits": "oxw+",
    "./utils/url": "prkv",
    "./transport/sender/xdr": "VmyL",
    "./transport/sender/xhr-cors": "TBnt",
    "./transport/sender/xhr-local": "9mX/",
    "./transport/sender/xhr-fake": "950Q",
    "./info-iframe": "/v8/",
    "./info-ajax": "2IH9"
  }],
  "kS45": [function (require, module, exports) {
    "use strict";
    var t = require("json3"),
      s = require("./utils/iframe");

    function o(t) {
      this._transport = t, t.on("message", this._transportMessage.bind(this)), t.on("close", this._transportClose.bind(this))
    }
    o.prototype._transportClose = function (o, e) {
      s.postMessage("c", t.stringify([o, e]))
    }, o.prototype._transportMessage = function (t) {
      s.postMessage("t", t)
    }, o.prototype._send = function (t) {
      this._transport.send(t)
    }, o.prototype._close = function () {
      this._transport.close(), this._transport.removeAllListeners()
    }, module.exports = o;
  }, {
    "json3": "r5wZ",
    "./utils/iframe": "lHOv"
  }],
  "v+99": [function (require, module, exports) {
    "use strict";
    var r = require("./utils/url"),
      e = require("./utils/event"),
      a = require("json3"),
      i = require("./facade"),
      t = require("./info-iframe-receiver"),
      n = require("./utils/iframe"),
      o = require("./location"),
      s = function () {};
    module.exports = function (c, f) {
      var u, d = {};
      f.forEach(function (r) {
        r.facadeTransport && (d[r.facadeTransport.transportName] = r.facadeTransport)
      }), d[t.transportName] = t, c.bootstrap_iframe = function () {
        var t;
        n.currentWindowId = o.hash.slice(1);
        e.attachEvent("message", function (e) {
          if (e.source === parent && (void 0 === u && (u = e.origin), e.origin === u)) {
            var f;
            try {
              f = a.parse(e.data)
            } catch (w) {
              return void s("bad json", e.data)
            }
            if (f.windowId === n.currentWindowId) switch (f.type) {
              case "s":
                var h;
                try {
                  h = a.parse(f.data)
                } catch (w) {
                  s("bad json", f.data);
                  break
                }
                var l = h[0],
                  m = h[1],
                  p = h[2],
                  v = h[3];
                if (s(l, m, p, v), l !== c.version) throw new Error('Incompatible SockJS! Main site uses: "' + l + '", the iframe: "' + c.version + '".');
                if (!r.isOriginEqual(p, o.href) || !r.isOriginEqual(v, o.href)) throw new Error("Can't connect to different domain from within an iframe. (" + o.href + ", " + p + ", " + v + ")");
                t = new i(new d[m](p, v));
                break;
              case "m":
                t._send(f.data);
                break;
              case "c":
                t && t._close(), t = null
            }
          }
        }), n.postMessage("s")
      }
    };
  }, {
    "./utils/url": "prkv",
    "./utils/event": "q8Q2",
    "json3": "r5wZ",
    "./facade": "kS45",
    "./info-iframe-receiver": "bZ+U",
    "./utils/iframe": "lHOv",
    "./location": "sN6f"
  }],
  "FIM5": [function (require, module, exports) {
    var global = arguments[3];
    var t = arguments[3];
    require("./shims");
    var r, e = require("url-parse"),
      s = require("inherits"),
      i = require("json3"),
      o = require("./utils/random"),
      n = require("./utils/escape"),
      a = require("./utils/url"),
      h = require("./utils/event"),
      l = require("./utils/transport"),
      p = require("./utils/object"),
      c = require("./utils/browser"),
      u = require("./utils/log"),
      d = require("./event/event"),
      _ = require("./event/eventtarget"),
      f = require("./location"),
      m = require("./event/close"),
      y = require("./event/trans-message"),
      v = require("./info-receiver"),
      S = function () {};

    function w(t, r, s) {
      if (!(this instanceof w)) return new w(t, r, s);
      if (arguments.length < 1) throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
      _.call(this), this.readyState = w.CONNECTING, this.extensions = "", this.protocol = "", (s = s || {}).protocols_whitelist && u.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead."), this._transportsWhitelist = s.transports, this._transportOptions = s.transportOptions || {};
      var i = s.sessionId || 8;
      if ("function" == typeof i) this._generateSessionId = i;
      else {
        if ("number" != typeof i) throw new TypeError("If sessionId is used in the options, it needs to be a number or a function.");
        this._generateSessionId = function () {
          return o.string(i)
        }
      }
      this._server = s.server || o.numberString(1e3);
      var n = new e(t);
      if (!n.host || !n.protocol) throw new SyntaxError("The URL '" + t + "' is invalid");
      if (n.hash) throw new SyntaxError("The URL must not contain a fragment");
      if ("http:" !== n.protocol && "https:" !== n.protocol) throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + n.protocol + "' is not allowed.");
      var h = "https:" === n.protocol;
      if ("https:" === f.protocol && !h) throw new Error("SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS");
      r ? Array.isArray(r) || (r = [r]) : r = [];
      var l = r.sort();
      l.forEach(function (t, r) {
        if (!t) throw new SyntaxError("The protocols entry '" + t + "' is invalid.");
        if (r < l.length - 1 && t === l[r + 1]) throw new SyntaxError("The protocols entry '" + t + "' is duplicated.")
      });
      var p = a.getOrigin(f.href);
      this._origin = p ? p.toLowerCase() : null, n.set("pathname", n.pathname.replace(/\/+$/, "")), this.url = n.href, S("using url", this.url), this._urlInfo = {
        nullOrigin: !c.hasDomain(),
        sameOrigin: a.isOriginEqual(this.url, f.href),
        sameScheme: a.isSchemeEqual(this.url, f.href)
      }, this._ir = new v(this.url, this._urlInfo), this._ir.once("finish", this._receiveInfo.bind(this))
    }

    function E(t) {
      return 1e3 === t || t >= 3e3 && t <= 4999
    }
    s(w, _), w.prototype.close = function (t, r) {
      if (t && !E(t)) throw new Error("InvalidAccessError: Invalid code");
      if (r && r.length > 123) throw new SyntaxError("reason argument has an invalid length");
      if (this.readyState !== w.CLOSING && this.readyState !== w.CLOSED) {
        this._close(t || 1e3, r || "Normal closure", !0)
      }
    }, w.prototype.send = function (t) {
      if ("string" != typeof t && (t = "" + t), this.readyState === w.CONNECTING) throw new Error("InvalidStateError: The connection has not been established yet");
      this.readyState === w.OPEN && this._transport.send(n.quote(t))
    }, w.version = require("./version"), w.CONNECTING = 0, w.OPEN = 1, w.CLOSING = 2, w.CLOSED = 3, w.prototype._receiveInfo = function (t, e) {
      if (S("_receiveInfo", e), this._ir = null, t) {
        this._rto = this.countRTO(e), this._transUrl = t.base_url ? t.base_url : this.url, t = p.extend(t, this._urlInfo), S("info", t);
        var s = r.filterToEnabled(this._transportsWhitelist, t);
        this._transports = s.main, S(this._transports.length + " enabled transports"), this._connect()
      } else this._close(1002, "Cannot connect to server")
    }, w.prototype._connect = function () {
      for (var r = this._transports.shift(); r; r = this._transports.shift()) {
        if (S("attempt", r.transportName), r.needBody && (!t.document.body || void 0 !== t.document.readyState && "complete" !== t.document.readyState && "interactive" !== t.document.readyState)) return S("waiting for body"), this._transports.unshift(r), void h.attachEvent("load", this._connect.bind(this));
        var e = this._rto * r.roundTrips || 5e3;
        this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), e), S("using timeout", e);
        var s = a.addPath(this._transUrl, "/" + this._server + "/" + this._generateSessionId()),
          i = this._transportOptions[r.transportName];
        S("transport url", s);
        var o = new r(s, this._transUrl, i);
        return o.on("message", this._transportMessage.bind(this)), o.once("close", this._transportClose.bind(this)), o.transportName = r.transportName, void(this._transport = o)
      }
      this._close(2e3, "All transports failed", !1)
    }, w.prototype._transportTimeout = function () {
      S("_transportTimeout"), this.readyState === w.CONNECTING && (this._transport && this._transport.close(), this._transportClose(2007, "Transport timed out"))
    }, w.prototype._transportMessage = function (t) {
      S("_transportMessage", t);
      var r, e = this,
        s = t.slice(0, 1),
        o = t.slice(1);
      switch (s) {
        case "o":
          return void this._open();
        case "h":
          return this.dispatchEvent(new d("heartbeat")), void S("heartbeat", this.transport)
      }
      if (o) try {
        r = i.parse(o)
      } catch (n) {
        S("bad json", o)
      }
      if (void 0 !== r) switch (s) {
        case "a":
          Array.isArray(r) && r.forEach(function (t) {
            S("message", e.transport, t), e.dispatchEvent(new y(t))
          });
          break;
        case "m":
          S("message", this.transport, r), this.dispatchEvent(new y(r));
          break;
        case "c":
          Array.isArray(r) && 2 === r.length && this._close(r[0], r[1], !0)
      } else S("empty payload", o)
    }, w.prototype._transportClose = function (t, r) {
      S("_transportClose", this.transport, t, r), this._transport && (this._transport.removeAllListeners(), this._transport = null, this.transport = null), E(t) || 2e3 === t || this.readyState !== w.CONNECTING ? this._close(t, r) : this._connect()
    }, w.prototype._open = function () {
      S("_open", this._transport.transportName, this.readyState), this.readyState === w.CONNECTING ? (this._transportTimeoutId && (clearTimeout(this._transportTimeoutId), this._transportTimeoutId = null), this.readyState = w.OPEN, this.transport = this._transport.transportName, this.dispatchEvent(new d("open")), S("connected", this.transport)) : this._close(1006, "Server lost session")
    }, w.prototype._close = function (t, r, e) {
      S("_close", this.transport, t, r, e, this.readyState);
      var s = !1;
      if (this._ir && (s = !0, this._ir.close(), this._ir = null), this._transport && (this._transport.close(), this._transport = null, this.transport = null), this.readyState === w.CLOSED) throw new Error("InvalidStateError: SockJS has already been closed");
      this.readyState = w.CLOSING, setTimeout(function () {
        this.readyState = w.CLOSED, s && this.dispatchEvent(new d("error"));
        var i = new m("close");
        i.wasClean = e || !1, i.code = t || 1e3, i.reason = r, this.dispatchEvent(i), this.onmessage = this.onclose = this.onerror = null, S("disconnected")
      }.bind(this), 0)
    }, w.prototype.countRTO = function (t) {
      return t > 100 ? 4 * t : 300 + t
    }, module.exports = function (t) {
      return r = l(t), require("./iframe-bootstrap")(w, t), w
    };
  }, {
    "./shims": "+ldi",
    "url-parse": "WxRL",
    "inherits": "oxw+",
    "json3": "r5wZ",
    "./utils/random": "kvjH",
    "./utils/escape": "80l2",
    "./utils/url": "prkv",
    "./utils/event": "q8Q2",
    "./utils/transport": "3t+s",
    "./utils/object": "ykCA",
    "./utils/browser": "+JeF",
    "./utils/log": "YVir",
    "./event/event": "Vudx",
    "./event/eventtarget": "PUqX",
    "./location": "sN6f",
    "./event/close": "Ry1i",
    "./event/trans-message": "/fK0",
    "./info-receiver": "cXIc",
    "./version": "A8Oj",
    "./iframe-bootstrap": "v+99"
  }],
  "EWtC": [function (require, module, exports) {
    var global = arguments[3];
    var o = arguments[3],
      e = require("./transport-list");
    module.exports = require("./main")(e), "_sockjs_onload" in o && setTimeout(o._sockjs_onload, 1);
  }, {
    "./transport-list": "jVqY",
    "./main": "FIM5"
  }],
  "20Fs": [function (require, module, exports) {
    "use strict";
    var r = exports;
    r.length = function (r) {
      var e = r.length;
      if (!e) return 0;
      for (var a = 0; --e % 4 > 1 && "=" === r.charAt(e);) ++a;
      return Math.ceil(3 * r.length) / 4 - a
    };
    for (var e = new Array(64), a = new Array(123), t = 0; t < 64;) a[e[t] = t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : t - 59 | 43] = t++;
    r.encode = function (r, a, t) {
      for (var n, i = null, o = [], c = 0, s = 0; a < t;) {
        var h = r[a++];
        switch (s) {
          case 0:
            o[c++] = e[h >> 2], n = (3 & h) << 4, s = 1;
            break;
          case 1:
            o[c++] = e[n | h >> 4], n = (15 & h) << 2, s = 2;
            break;
          case 2:
            o[c++] = e[n | h >> 6], o[c++] = e[63 & h], s = 0
        }
        c > 8191 && ((i || (i = [])).push(String.fromCharCode.apply(String, o)), c = 0)
      }
      return s && (o[c++] = e[n], o[c++] = 61, 1 === s && (o[c++] = 61)), i ? (c && i.push(String.fromCharCode.apply(String, o.slice(0, c))), i.join("")) : String.fromCharCode.apply(String, o.slice(0, c))
    };
    var n = "invalid encoding";
    r.decode = function (r, e, t) {
      for (var i, o = t, c = 0, s = 0; s < r.length;) {
        var h = r.charCodeAt(s++);
        if (61 === h && c > 1) break;
        if (void 0 === (h = a[h])) throw Error(n);
        switch (c) {
          case 0:
            i = h, c = 1;
            break;
          case 1:
            e[t++] = i << 2 | (48 & h) >> 4, i = h, c = 2;
            break;
          case 2:
            e[t++] = (15 & i) << 4 | (60 & h) >> 2, i = h, c = 3;
            break;
          case 3:
            e[t++] = (3 & i) << 6 | h, c = 0
        }
      }
      if (1 === c) throw Error(n);
      return t - o
    }, r.test = function (r) {
      return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(r)
    };
  }, {}],
  "M11I": [function (require, module, exports) {
    "use strict";

    function n(n) {
      return "undefined" != typeof Float32Array ? function () {
        var e = new Float32Array([-0]),
          t = new Uint8Array(e.buffer),
          r = 128 === t[3];

        function o(n, r, o) {
          e[0] = n, r[o] = t[0], r[o + 1] = t[1], r[o + 2] = t[2], r[o + 3] = t[3]
        }

        function u(n, r, o) {
          e[0] = n, r[o] = t[3], r[o + 1] = t[2], r[o + 2] = t[1], r[o + 3] = t[0]
        }

        function i(n, r) {
          return t[0] = n[r], t[1] = n[r + 1], t[2] = n[r + 2], t[3] = n[r + 3], e[0]
        }

        function a(n, r) {
          return t[3] = n[r], t[2] = n[r + 1], t[1] = n[r + 2], t[0] = n[r + 3], e[0]
        }
        n.writeFloatLE = r ? o : u, n.writeFloatBE = r ? u : o, n.readFloatLE = r ? i : a, n.readFloatBE = r ? a : i
      }() : function () {
        function u(n, e, t, r) {
          var o = e < 0 ? 1 : 0;
          if (o && (e = -e), 0 === e) n(1 / e > 0 ? 0 : 2147483648, t, r);
          else if (isNaN(e)) n(2143289344, t, r);
          else if (e > 3.4028234663852886e38) n((o << 31 | 2139095040) >>> 0, t, r);
          else if (e < 1.1754943508222875e-38) n((o << 31 | Math.round(e / 1.401298464324817e-45)) >>> 0, t, r);
          else {
            var u = Math.floor(Math.log(e) / Math.LN2);
            n((o << 31 | u + 127 << 23 | 8388607 & Math.round(e * Math.pow(2, -u) * 8388608)) >>> 0, t, r)
          }
        }

        function i(n, e, t) {
          var r = n(e, t),
            o = 2 * (r >> 31) + 1,
            u = r >>> 23 & 255,
            i = 8388607 & r;
          return 255 === u ? i ? NaN : o * (1 / 0) : 0 === u ? 1.401298464324817e-45 * o * i : o * Math.pow(2, u - 150) * (i + 8388608)
        }
        n.writeFloatLE = u.bind(null, e), n.writeFloatBE = u.bind(null, t), n.readFloatLE = i.bind(null, r), n.readFloatBE = i.bind(null, o)
      }(), "undefined" != typeof Float64Array ? function () {
        var e = new Float64Array([-0]),
          t = new Uint8Array(e.buffer),
          r = 128 === t[7];

        function o(n, r, o) {
          e[0] = n, r[o] = t[0], r[o + 1] = t[1], r[o + 2] = t[2], r[o + 3] = t[3], r[o + 4] = t[4], r[o + 5] = t[5], r[o + 6] = t[6], r[o + 7] = t[7]
        }

        function u(n, r, o) {
          e[0] = n, r[o] = t[7], r[o + 1] = t[6], r[o + 2] = t[5], r[o + 3] = t[4], r[o + 4] = t[3], r[o + 5] = t[2], r[o + 6] = t[1], r[o + 7] = t[0]
        }

        function i(n, r) {
          return t[0] = n[r], t[1] = n[r + 1], t[2] = n[r + 2], t[3] = n[r + 3], t[4] = n[r + 4], t[5] = n[r + 5], t[6] = n[r + 6], t[7] = n[r + 7], e[0]
        }

        function a(n, r) {
          return t[7] = n[r], t[6] = n[r + 1], t[5] = n[r + 2], t[4] = n[r + 3], t[3] = n[r + 4], t[2] = n[r + 5], t[1] = n[r + 6], t[0] = n[r + 7], e[0]
        }
        n.writeDoubleLE = r ? o : u, n.writeDoubleBE = r ? u : o, n.readDoubleLE = r ? i : a, n.readDoubleBE = r ? a : i
      }() : function () {
        function u(n, e, t, r, o, u) {
          var i = r < 0 ? 1 : 0;
          if (i && (r = -r), 0 === r) n(0, o, u + e), n(1 / r > 0 ? 0 : 2147483648, o, u + t);
          else if (isNaN(r)) n(0, o, u + e), n(2146959360, o, u + t);
          else if (r > 1.7976931348623157e308) n(0, o, u + e), n((i << 31 | 2146435072) >>> 0, o, u + t);
          else {
            var a;
            if (r < 2.2250738585072014e-308) n((a = r / 5e-324) >>> 0, o, u + e), n((i << 31 | a / 4294967296) >>> 0, o, u + t);
            else {
              var l = Math.floor(Math.log(r) / Math.LN2);
              1024 === l && (l = 1023), n(4503599627370496 * (a = r * Math.pow(2, -l)) >>> 0, o, u + e), n((i << 31 | l + 1023 << 20 | 1048576 * a & 1048575) >>> 0, o, u + t)
            }
          }
        }

        function i(n, e, t, r, o) {
          var u = n(r, o + e),
            i = n(r, o + t),
            a = 2 * (i >> 31) + 1,
            l = i >>> 20 & 2047,
            f = 4294967296 * (1048575 & i) + u;
          return 2047 === l ? f ? NaN : a * (1 / 0) : 0 === l ? 5e-324 * a * f : a * Math.pow(2, l - 1075) * (f + 4503599627370496)
        }
        n.writeDoubleLE = u.bind(null, e, 0, 4), n.writeDoubleBE = u.bind(null, t, 4, 0), n.readDoubleLE = i.bind(null, r, 0, 4), n.readDoubleBE = i.bind(null, o, 4, 0)
      }(), n
    }

    function e(n, e, t) {
      e[t] = 255 & n, e[t + 1] = n >>> 8 & 255, e[t + 2] = n >>> 16 & 255, e[t + 3] = n >>> 24
    }

    function t(n, e, t) {
      e[t] = n >>> 24, e[t + 1] = n >>> 16 & 255, e[t + 2] = n >>> 8 & 255, e[t + 3] = 255 & n
    }

    function r(n, e) {
      return (n[e] | n[e + 1] << 8 | n[e + 2] << 16 | n[e + 3] << 24) >>> 0
    }

    function o(n, e) {
      return (n[e] << 24 | n[e + 1] << 16 | n[e + 2] << 8 | n[e + 3]) >>> 0
    }
    module.exports = n(n);
  }, {}],
  "MXG9": [function (require, module, exports) {
    "use strict";

    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length)) return mod
      } catch (e) {}
      return null
    }
    module.exports = inquire;
  }, {}],
  "HIDA": [function (require, module, exports) {
    "use strict";
    var r = exports;
    r.length = function (r) {
      for (var t = 0, n = 0, e = 0; e < r.length; ++e)(n = r.charCodeAt(e)) < 128 ? t += 1 : n < 2048 ? t += 2 : 55296 == (64512 & n) && 56320 == (64512 & r.charCodeAt(e + 1)) ? (++e, t += 4) : t += 3;
      return t
    }, r.read = function (r, t, n) {
      if (n - t < 1) return "";
      for (var e, o = null, a = [], i = 0; t < n;)(e = r[t++]) < 128 ? a[i++] = e : e > 191 && e < 224 ? a[i++] = (31 & e) << 6 | 63 & r[t++] : e > 239 && e < 365 ? (e = ((7 & e) << 18 | (63 & r[t++]) << 12 | (63 & r[t++]) << 6 | 63 & r[t++]) - 65536, a[i++] = 55296 + (e >> 10), a[i++] = 56320 + (1023 & e)) : a[i++] = (15 & e) << 12 | (63 & r[t++]) << 6 | 63 & r[t++], i > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, a)), i = 0);
      return o ? (i && o.push(String.fromCharCode.apply(String, a.slice(0, i))), o.join("")) : String.fromCharCode.apply(String, a.slice(0, i))
    }, r.write = function (r, t, n) {
      for (var e, o, a = n, i = 0; i < r.length; ++i)(e = r.charCodeAt(i)) < 128 ? t[n++] = e : e < 2048 ? (t[n++] = e >> 6 | 192, t[n++] = 63 & e | 128) : 55296 == (64512 & e) && 56320 == (64512 & (o = r.charCodeAt(i + 1))) ? (e = 65536 + ((1023 & e) << 10) + (1023 & o), ++i, t[n++] = e >> 18 | 240, t[n++] = e >> 12 & 63 | 128, t[n++] = e >> 6 & 63 | 128, t[n++] = 63 & e | 128) : (t[n++] = e >> 12 | 224, t[n++] = e >> 6 & 63 | 128, t[n++] = 63 & e | 128);
      return n - a
    };
  }, {}],
  "0yq+": [function (require, module, exports) {
    "use strict";

    function r(r, n, t) {
      var u = t || 8192,
        e = u >>> 1,
        l = null,
        c = u;
      return function (t) {
        if (t < 1 || t > e) return r(t);
        c + t > u && (l = r(u), c = 0);
        var i = n.call(l, c, c += t);
        return 7 & c && (c = 1 + (7 | c)), i
      }
    }
    module.exports = r;
  }, {}],
  "mM8D": [function (require, module, exports) {
    "use strict";
    module.exports = i;
    var t = require("../util/minimal");

    function i(t, i) {
      this.lo = t >>> 0, this.hi = i >>> 0
    }
    var o = i.zero = new i(0, 0);
    o.toNumber = function () {
      return 0
    }, o.zzEncode = o.zzDecode = function () {
      return this
    }, o.length = function () {
      return 1
    };
    var r = i.zeroHash = "\0\0\0\0\0\0\0\0";
    i.fromNumber = function (t) {
      if (0 === t) return o;
      var r = t < 0;
      r && (t = -t);
      var h = t >>> 0,
        n = (t - h) / 4294967296 >>> 0;
      return r && (n = ~n >>> 0, h = ~h >>> 0, ++h > 4294967295 && (h = 0, ++n > 4294967295 && (n = 0))), new i(h, n)
    }, i.from = function (r) {
      if ("number" == typeof r) return i.fromNumber(r);
      if (t.isString(r)) {
        if (!t.Long) return i.fromNumber(parseInt(r, 10));
        r = t.Long.fromString(r)
      }
      return r.low || r.high ? new i(r.low >>> 0, r.high >>> 0) : o
    }, i.prototype.toNumber = function (t) {
      if (!t && this.hi >>> 31) {
        var i = 1 + ~this.lo >>> 0,
          o = ~this.hi >>> 0;
        return i || (o = o + 1 >>> 0), -(i + 4294967296 * o)
      }
      return this.lo + 4294967296 * this.hi
    }, i.prototype.toLong = function (i) {
      return t.Long ? new t.Long(0 | this.lo, 0 | this.hi, Boolean(i)) : {
        low: 0 | this.lo,
        high: 0 | this.hi,
        unsigned: Boolean(i)
      }
    };
    var h = String.prototype.charCodeAt;
    i.fromHash = function (t) {
      return t === r ? o : new i((h.call(t, 0) | h.call(t, 1) << 8 | h.call(t, 2) << 16 | h.call(t, 3) << 24) >>> 0, (h.call(t, 4) | h.call(t, 5) << 8 | h.call(t, 6) << 16 | h.call(t, 7) << 24) >>> 0)
    }, i.prototype.toHash = function () {
      return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24)
    }, i.prototype.zzEncode = function () {
      var t = this.hi >> 31;
      return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ t) >>> 0, this.lo = (this.lo << 1 ^ t) >>> 0, this
    }, i.prototype.zzDecode = function () {
      var t = -(1 & this.lo);
      return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ t) >>> 0, this.hi = (this.hi >>> 1 ^ t) >>> 0, this
    }, i.prototype.length = function () {
      var t = this.lo,
        i = (this.lo >>> 28 | this.hi << 4) >>> 0,
        o = this.hi >>> 24;
      return 0 === o ? 0 === i ? t < 16384 ? t < 128 ? 1 : 2 : t < 2097152 ? 3 : 4 : i < 16384 ? i < 128 ? 5 : 6 : i < 2097152 ? 7 : 8 : o < 128 ? 9 : 10
    };
  }, {
    "../util/minimal": "+OqZ"
  }],
  "FRly": [function (require, module, exports) {
    "use strict";
    exports.byteLength = u, exports.toByteArray = i, exports.fromByteArray = d;
    for (var r = [], t = [], e = "undefined" != typeof Uint8Array ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, a = n.length; o < a; ++o) r[o] = n[o], t[n.charCodeAt(o)] = o;

    function h(r) {
      var t = r.length;
      if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var e = r.indexOf("=");
      return -1 === e && (e = t), [e, e === t ? 0 : 4 - e % 4]
    }

    function u(r) {
      var t = h(r),
        e = t[0],
        n = t[1];
      return 3 * (e + n) / 4 - n
    }

    function c(r, t, e) {
      return 3 * (t + e) / 4 - e
    }

    function i(r) {
      for (var n, o = h(r), a = o[0], u = o[1], i = new e(c(r, a, u)), f = 0, A = u > 0 ? a - 4 : a, d = 0; d < A; d += 4) n = t[r.charCodeAt(d)] << 18 | t[r.charCodeAt(d + 1)] << 12 | t[r.charCodeAt(d + 2)] << 6 | t[r.charCodeAt(d + 3)], i[f++] = n >> 16 & 255, i[f++] = n >> 8 & 255, i[f++] = 255 & n;
      return 2 === u && (n = t[r.charCodeAt(d)] << 2 | t[r.charCodeAt(d + 1)] >> 4, i[f++] = 255 & n), 1 === u && (n = t[r.charCodeAt(d)] << 10 | t[r.charCodeAt(d + 1)] << 4 | t[r.charCodeAt(d + 2)] >> 2, i[f++] = n >> 8 & 255, i[f++] = 255 & n), i
    }

    function f(t) {
      return r[t >> 18 & 63] + r[t >> 12 & 63] + r[t >> 6 & 63] + r[63 & t]
    }

    function A(r, t, e) {
      for (var n, o = [], a = t; a < e; a += 3) n = (r[a] << 16 & 16711680) + (r[a + 1] << 8 & 65280) + (255 & r[a + 2]), o.push(f(n));
      return o.join("")
    }

    function d(t) {
      for (var e, n = t.length, o = n % 3, a = [], h = 0, u = n - o; h < u; h += 16383) a.push(A(t, h, h + 16383 > u ? u : h + 16383));
      return 1 === o ? (e = t[n - 1], a.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === o && (e = (t[n - 2] << 8) + t[n - 1], a.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "=")), a.join("")
    }
    t["-".charCodeAt(0)] = 62, t["_".charCodeAt(0)] = 63;
  }, {}],
  "Quj6": [function (require, module, exports) {
    exports.read = function (a, o, t, r, h) {
      var M, p, w = 8 * h - r - 1,
        f = (1 << w) - 1,
        e = f >> 1,
        i = -7,
        N = t ? h - 1 : 0,
        n = t ? -1 : 1,
        s = a[o + N];
      for (N += n, M = s & (1 << -i) - 1, s >>= -i, i += w; i > 0; M = 256 * M + a[o + N], N += n, i -= 8);
      for (p = M & (1 << -i) - 1, M >>= -i, i += r; i > 0; p = 256 * p + a[o + N], N += n, i -= 8);
      if (0 === M) M = 1 - e;
      else {
        if (M === f) return p ? NaN : 1 / 0 * (s ? -1 : 1);
        p += Math.pow(2, r), M -= e
      }
      return (s ? -1 : 1) * p * Math.pow(2, M - r)
    }, exports.write = function (a, o, t, r, h, M) {
      var p, w, f, e = 8 * M - h - 1,
        i = (1 << e) - 1,
        N = i >> 1,
        n = 23 === h ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        s = r ? 0 : M - 1,
        u = r ? 1 : -1,
        l = o < 0 || 0 === o && 1 / o < 0 ? 1 : 0;
      for (o = Math.abs(o), isNaN(o) || o === 1 / 0 ? (w = isNaN(o) ? 1 : 0, p = i) : (p = Math.floor(Math.log(o) / Math.LN2), o * (f = Math.pow(2, -p)) < 1 && (p--, f *= 2), (o += p + N >= 1 ? n / f : n * Math.pow(2, 1 - N)) * f >= 2 && (p++, f /= 2), p + N >= i ? (w = 0, p = i) : p + N >= 1 ? (w = (o * f - 1) * Math.pow(2, h), p += N) : (w = o * Math.pow(2, N - 1) * Math.pow(2, h), p = 0)); h >= 8; a[t + s] = 255 & w, s += u, w /= 256, h -= 8);
      for (p = p << h | w, e += h; e > 0; a[t + s] = 255 & p, s += u, p /= 256, e -= 8);
      a[t + s - u] |= 128 * l
    };
  }, {}],
  "aq/z": [function (require, module, exports) {
    var r = {}.toString;
    module.exports = Array.isArray || function (t) {
      return "[object Array]" == r.call(t)
    };
  }, {}],
  "aMB2": [function (require, module, exports) {

    var global = arguments[3];
    var t = arguments[3],
      r = require("base64-js"),
      e = require("ieee754"),
      n = require("isarray");

    function i() {
      try {
        var t = new Uint8Array(1);
        return t.__proto__ = {
          __proto__: Uint8Array.prototype,
          foo: function () {
            return 42
          }
        }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
      } catch (r) {
        return !1
      }
    }

    function o() {
      return f.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
    }

    function u(t, r) {
      if (o() < r) throw new RangeError("Invalid typed array length");
      return f.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(r)).__proto__ = f.prototype : (null === t && (t = new f(r)), t.length = r), t
    }

    function f(t, r, e) {
      if (!(f.TYPED_ARRAY_SUPPORT || this instanceof f)) return new f(t, r, e);
      if ("number" == typeof t) {
        if ("string" == typeof r) throw new Error("If encoding is specified then the first argument must be a string");
        return c(this, t)
      }
      return s(this, t, r, e)
    }

    function s(t, r, e, n) {
      if ("number" == typeof r) throw new TypeError('"value" argument must not be a number');
      return "undefined" != typeof ArrayBuffer && r instanceof ArrayBuffer ? g(t, r, e, n) : "string" == typeof r ? l(t, r, e) : y(t, r)
    }

    function h(t) {
      if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
      if (t < 0) throw new RangeError('"size" argument must not be negative')
    }

    function a(t, r, e, n) {
      return h(r), r <= 0 ? u(t, r) : void 0 !== e ? "string" == typeof n ? u(t, r).fill(e, n) : u(t, r).fill(e) : u(t, r)
    }

    function c(t, r) {
      if (h(r), t = u(t, r < 0 ? 0 : 0 | w(r)), !f.TYPED_ARRAY_SUPPORT)
        for (var e = 0; e < r; ++e) t[e] = 0;
      return t
    }

    function l(t, r, e) {
      if ("string" == typeof e && "" !== e || (e = "utf8"), !f.isEncoding(e)) throw new TypeError('"encoding" must be a valid string encoding');
      var n = 0 | v(r, e),
        i = (t = u(t, n)).write(r, e);
      return i !== n && (t = t.slice(0, i)), t
    }

    function p(t, r) {
      var e = r.length < 0 ? 0 : 0 | w(r.length);
      t = u(t, e);
      for (var n = 0; n < e; n += 1) t[n] = 255 & r[n];
      return t
    }

    function g(t, r, e, n) {
      if (r.byteLength, e < 0 || r.byteLength < e) throw new RangeError("'offset' is out of bounds");
      if (r.byteLength < e + (n || 0)) throw new RangeError("'length' is out of bounds");
      return r = void 0 === e && void 0 === n ? new Uint8Array(r) : void 0 === n ? new Uint8Array(r, e) : new Uint8Array(r, e, n), f.TYPED_ARRAY_SUPPORT ? (t = r).__proto__ = f.prototype : t = p(t, r), t
    }

    function y(t, r) {
      if (f.isBuffer(r)) {
        var e = 0 | w(r.length);
        return 0 === (t = u(t, e)).length ? t : (r.copy(t, 0, 0, e), t)
      }
      if (r) {
        if ("undefined" != typeof ArrayBuffer && r.buffer instanceof ArrayBuffer || "length" in r) return "number" != typeof r.length || W(r.length) ? u(t, 0) : p(t, r);
        if ("Buffer" === r.type && n(r.data)) return p(t, r.data)
      }
      throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
    }

    function w(t) {
      if (t >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
      return 0 | t
    }

    function d(t) {
      return +t != t && (t = 0), f.alloc(+t)
    }

    function v(t, r) {
      if (f.isBuffer(t)) return t.length;
      if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
      "string" != typeof t && (t = "" + t);
      var e = t.length;
      if (0 === e) return 0;
      for (var n = !1;;) switch (r) {
        case "ascii":
        case "latin1":
        case "binary":
          return e;
        case "utf8":
        case "utf-8":
        case void 0:
          return $(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * e;
        case "hex":
          return e >>> 1;
        case "base64":
          return K(t).length;
        default:
          if (n) return $(t).length;
          r = ("" + r).toLowerCase(), n = !0
      }
    }

    function E(t, r, e) {
      var n = !1;
      if ((void 0 === r || r < 0) && (r = 0), r > this.length) return "";
      if ((void 0 === e || e > this.length) && (e = this.length), e <= 0) return "";
      if ((e >>>= 0) <= (r >>>= 0)) return "";
      for (t || (t = "utf8");;) switch (t) {
        case "hex":
          return x(this, r, e);
        case "utf8":
        case "utf-8":
          return Y(this, r, e);
        case "ascii":
          return L(this, r, e);
        case "latin1":
        case "binary":
          return D(this, r, e);
        case "base64":
          return S(this, r, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return C(this, r, e);
        default:
          if (n) throw new TypeError("Unknown encoding: " + t);
          t = (t + "").toLowerCase(), n = !0
      }
    }

    function b(t, r, e) {
      var n = t[r];
      t[r] = t[e], t[e] = n
    }

    function R(t, r, e, n, i) {
      if (0 === t.length) return -1;
      if ("string" == typeof e ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, isNaN(e) && (e = i ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
        if (i) return -1;
        e = t.length - 1
      } else if (e < 0) {
        if (!i) return -1;
        e = 0
      }
      if ("string" == typeof r && (r = f.from(r, n)), f.isBuffer(r)) return 0 === r.length ? -1 : _(t, r, e, n, i);
      if ("number" == typeof r) return r &= 255, f.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : _(t, [r], e, n, i);
      throw new TypeError("val must be string, number or Buffer")
    }

    function _(t, r, e, n, i) {
      var o, u = 1,
        f = t.length,
        s = r.length;
      if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
        if (t.length < 2 || r.length < 2) return -1;
        u = 2, f /= 2, s /= 2, e /= 2
      }

      function h(t, r) {
        return 1 === u ? t[r] : t.readUInt16BE(r * u)
      }
      if (i) {
        var a = -1;
        for (o = e; o < f; o++)
          if (h(t, o) === h(r, -1 === a ? 0 : o - a)) {
            if (-1 === a && (a = o), o - a + 1 === s) return a * u
          } else -1 !== a && (o -= o - a), a = -1
      } else
        for (e + s > f && (e = f - s), o = e; o >= 0; o--) {
          for (var c = !0, l = 0; l < s; l++)
            if (h(t, o + l) !== h(r, l)) {
              c = !1;
              break
            } if (c) return o
        }
      return -1
    }

    function A(t, r, e, n) {
      e = Number(e) || 0;
      var i = t.length - e;
      n ? (n = Number(n)) > i && (n = i) : n = i;
      var o = r.length;
      if (o % 2 != 0) throw new TypeError("Invalid hex string");
      n > o / 2 && (n = o / 2);
      for (var u = 0; u < n; ++u) {
        var f = parseInt(r.substr(2 * u, 2), 16);
        if (isNaN(f)) return u;
        t[e + u] = f
      }
      return u
    }

    function m(t, r, e, n) {
      return Q($(r, t.length - e), t, e, n)
    }

    function P(t, r, e, n) {
      return Q(G(r), t, e, n)
    }

    function T(t, r, e, n) {
      return P(t, r, e, n)
    }

    function B(t, r, e, n) {
      return Q(K(r), t, e, n)
    }

    function U(t, r, e, n) {
      return Q(H(r, t.length - e), t, e, n)
    }

    function S(t, e, n) {
      return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
    }

    function Y(t, r, e) {
      e = Math.min(t.length, e);
      for (var n = [], i = r; i < e;) {
        var o, u, f, s, h = t[i],
          a = null,
          c = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
        if (i + c <= e) switch (c) {
          case 1:
            h < 128 && (a = h);
            break;
          case 2:
            128 == (192 & (o = t[i + 1])) && (s = (31 & h) << 6 | 63 & o) > 127 && (a = s);
            break;
          case 3:
            o = t[i + 1], u = t[i + 2], 128 == (192 & o) && 128 == (192 & u) && (s = (15 & h) << 12 | (63 & o) << 6 | 63 & u) > 2047 && (s < 55296 || s > 57343) && (a = s);
            break;
          case 4:
            o = t[i + 1], u = t[i + 2], f = t[i + 3], 128 == (192 & o) && 128 == (192 & u) && 128 == (192 & f) && (s = (15 & h) << 18 | (63 & o) << 12 | (63 & u) << 6 | 63 & f) > 65535 && s < 1114112 && (a = s)
        }
        null === a ? (a = 65533, c = 1) : a > 65535 && (a -= 65536, n.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), n.push(a), i += c
      }
      return O(n)
    }
    exports.Buffer = f, exports.SlowBuffer = d, exports.INSPECT_MAX_BYTES = 50, f.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : i(), exports.kMaxLength = o(), f.poolSize = 8192, f._augment = function (t) {
      return t.__proto__ = f.prototype, t
    }, f.from = function (t, r, e) {
      return s(null, t, r, e)
    }, f.TYPED_ARRAY_SUPPORT && (f.prototype.__proto__ = Uint8Array.prototype, f.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && f[Symbol.species] === f && Object.defineProperty(f, Symbol.species, {
      value: null,
      configurable: !0
    })), f.alloc = function (t, r, e) {
      return a(null, t, r, e)
    }, f.allocUnsafe = function (t) {
      return c(null, t)
    }, f.allocUnsafeSlow = function (t) {
      return c(null, t)
    }, f.isBuffer = function (t) {
      return !(null == t || !t._isBuffer)
    }, f.compare = function (t, r) {
      if (!f.isBuffer(t) || !f.isBuffer(r)) throw new TypeError("Arguments must be Buffers");
      if (t === r) return 0;
      for (var e = t.length, n = r.length, i = 0, o = Math.min(e, n); i < o; ++i)
        if (t[i] !== r[i]) {
          e = t[i], n = r[i];
          break
        } return e < n ? -1 : n < e ? 1 : 0
    }, f.isEncoding = function (t) {
      switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1
      }
    }, f.concat = function (t, r) {
      if (!n(t)) throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === t.length) return f.alloc(0);
      var e;
      if (void 0 === r)
        for (r = 0, e = 0; e < t.length; ++e) r += t[e].length;
      var i = f.allocUnsafe(r),
        o = 0;
      for (e = 0; e < t.length; ++e) {
        var u = t[e];
        if (!f.isBuffer(u)) throw new TypeError('"list" argument must be an Array of Buffers');
        u.copy(i, o), o += u.length
      }
      return i
    }, f.byteLength = v, f.prototype._isBuffer = !0, f.prototype.swap16 = function () {
      var t = this.length;
      if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var r = 0; r < t; r += 2) b(this, r, r + 1);
      return this
    }, f.prototype.swap32 = function () {
      var t = this.length;
      if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var r = 0; r < t; r += 4) b(this, r, r + 3), b(this, r + 1, r + 2);
      return this
    }, f.prototype.swap64 = function () {
      var t = this.length;
      if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var r = 0; r < t; r += 8) b(this, r, r + 7), b(this, r + 1, r + 6), b(this, r + 2, r + 5), b(this, r + 3, r + 4);
      return this
    }, f.prototype.toString = function () {
      var t = 0 | this.length;
      return 0 === t ? "" : 0 === arguments.length ? Y(this, 0, t) : E.apply(this, arguments)
    }, f.prototype.equals = function (t) {
      if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
      return this === t || 0 === f.compare(this, t)
    }, f.prototype.inspect = function () {
      var t = "",
        r = exports.INSPECT_MAX_BYTES;
      return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (t += " ... ")), "<Buffer " + t + ">"
    }, f.prototype.compare = function (t, r, e, n, i) {
      if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
      if (void 0 === r && (r = 0), void 0 === e && (e = t ? t.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), r < 0 || e > t.length || n < 0 || i > this.length) throw new RangeError("out of range index");
      if (n >= i && r >= e) return 0;
      if (n >= i) return -1;
      if (r >= e) return 1;
      if (this === t) return 0;
      for (var o = (i >>>= 0) - (n >>>= 0), u = (e >>>= 0) - (r >>>= 0), s = Math.min(o, u), h = this.slice(n, i), a = t.slice(r, e), c = 0; c < s; ++c)
        if (h[c] !== a[c]) {
          o = h[c], u = a[c];
          break
        } return o < u ? -1 : u < o ? 1 : 0
    }, f.prototype.includes = function (t, r, e) {
      return -1 !== this.indexOf(t, r, e)
    }, f.prototype.indexOf = function (t, r, e) {
      return R(this, t, r, e, !0)
    }, f.prototype.lastIndexOf = function (t, r, e) {
      return R(this, t, r, e, !1)
    }, f.prototype.write = function (t, r, e, n) {
      if (void 0 === r) n = "utf8", e = this.length, r = 0;
      else if (void 0 === e && "string" == typeof r) n = r, e = this.length, r = 0;
      else {
        if (!isFinite(r)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        r |= 0, isFinite(e) ? (e |= 0, void 0 === n && (n = "utf8")) : (n = e, e = void 0)
      }
      var i = this.length - r;
      if ((void 0 === e || e > i) && (e = i), t.length > 0 && (e < 0 || r < 0) || r > this.length) throw new RangeError("Attempt to write outside buffer bounds");
      n || (n = "utf8");
      for (var o = !1;;) switch (n) {
        case "hex":
          return A(this, t, r, e);
        case "utf8":
        case "utf-8":
          return m(this, t, r, e);
        case "ascii":
          return P(this, t, r, e);
        case "latin1":
        case "binary":
          return T(this, t, r, e);
        case "base64":
          return B(this, t, r, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return U(this, t, r, e);
        default:
          if (o) throw new TypeError("Unknown encoding: " + n);
          n = ("" + n).toLowerCase(), o = !0
      }
    }, f.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      }
    };
    var I = 4096;

    function O(t) {
      var r = t.length;
      if (r <= I) return String.fromCharCode.apply(String, t);
      for (var e = "", n = 0; n < r;) e += String.fromCharCode.apply(String, t.slice(n, n += I));
      return e
    }

    function L(t, r, e) {
      var n = "";
      e = Math.min(t.length, e);
      for (var i = r; i < e; ++i) n += String.fromCharCode(127 & t[i]);
      return n
    }

    function D(t, r, e) {
      var n = "";
      e = Math.min(t.length, e);
      for (var i = r; i < e; ++i) n += String.fromCharCode(t[i]);
      return n
    }

    function x(t, r, e) {
      var n = t.length;
      (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
      for (var i = "", o = r; o < e; ++o) i += Z(t[o]);
      return i
    }

    function C(t, r, e) {
      for (var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
      return i
    }

    function M(t, r, e) {
      if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
      if (t + r > e) throw new RangeError("Trying to access beyond buffer length")
    }

    function k(t, r, e, n, i, o) {
      if (!f.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (r > i || r < o) throw new RangeError('"value" argument is out of bounds');
      if (e + n > t.length) throw new RangeError("Index out of range")
    }

    function N(t, r, e, n) {
      r < 0 && (r = 65535 + r + 1);
      for (var i = 0, o = Math.min(t.length - e, 2); i < o; ++i) t[e + i] = (r & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i)
    }

    function z(t, r, e, n) {
      r < 0 && (r = 4294967295 + r + 1);
      for (var i = 0, o = Math.min(t.length - e, 4); i < o; ++i) t[e + i] = r >>> 8 * (n ? i : 3 - i) & 255
    }

    function F(t, r, e, n, i, o) {
      if (e + n > t.length) throw new RangeError("Index out of range");
      if (e < 0) throw new RangeError("Index out of range")
    }

    function j(t, r, n, i, o) {
      return o || F(t, r, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), e.write(t, r, n, i, 23, 4), n + 4
    }

    function q(t, r, n, i, o) {
      return o || F(t, r, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), e.write(t, r, n, i, 52, 8), n + 8
    }
    f.prototype.slice = function (t, r) {
      var e, n = this.length;
      if ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (r = void 0 === r ? n : ~~r) < 0 ? (r += n) < 0 && (r = 0) : r > n && (r = n), r < t && (r = t), f.TYPED_ARRAY_SUPPORT)(e = this.subarray(t, r)).__proto__ = f.prototype;
      else {
        var i = r - t;
        e = new f(i, void 0);
        for (var o = 0; o < i; ++o) e[o] = this[o + t]
      }
      return e
    }, f.prototype.readUIntLE = function (t, r, e) {
      t |= 0, r |= 0, e || M(t, r, this.length);
      for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) n += this[t + o] * i;
      return n
    }, f.prototype.readUIntBE = function (t, r, e) {
      t |= 0, r |= 0, e || M(t, r, this.length);
      for (var n = this[t + --r], i = 1; r > 0 && (i *= 256);) n += this[t + --r] * i;
      return n
    }, f.prototype.readUInt8 = function (t, r) {
      return r || M(t, 1, this.length), this[t]
    }, f.prototype.readUInt16LE = function (t, r) {
      return r || M(t, 2, this.length), this[t] | this[t + 1] << 8
    }, f.prototype.readUInt16BE = function (t, r) {
      return r || M(t, 2, this.length), this[t] << 8 | this[t + 1]
    }, f.prototype.readUInt32LE = function (t, r) {
      return r || M(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
    }, f.prototype.readUInt32BE = function (t, r) {
      return r || M(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
    }, f.prototype.readIntLE = function (t, r, e) {
      t |= 0, r |= 0, e || M(t, r, this.length);
      for (var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);) n += this[t + o] * i;
      return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n
    }, f.prototype.readIntBE = function (t, r, e) {
      t |= 0, r |= 0, e || M(t, r, this.length);
      for (var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256);) o += this[t + --n] * i;
      return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)), o
    }, f.prototype.readInt8 = function (t, r) {
      return r || M(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
    }, f.prototype.readInt16LE = function (t, r) {
      r || M(t, 2, this.length);
      var e = this[t] | this[t + 1] << 8;
      return 32768 & e ? 4294901760 | e : e
    }, f.prototype.readInt16BE = function (t, r) {
      r || M(t, 2, this.length);
      var e = this[t + 1] | this[t] << 8;
      return 32768 & e ? 4294901760 | e : e
    }, f.prototype.readInt32LE = function (t, r) {
      return r || M(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
    }, f.prototype.readInt32BE = function (t, r) {
      return r || M(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
    }, f.prototype.readFloatLE = function (t, r) {
      return r || M(t, 4, this.length), e.read(this, t, !0, 23, 4)
    }, f.prototype.readFloatBE = function (t, r) {
      return r || M(t, 4, this.length), e.read(this, t, !1, 23, 4)
    }, f.prototype.readDoubleLE = function (t, r) {
      return r || M(t, 8, this.length), e.read(this, t, !0, 52, 8)
    }, f.prototype.readDoubleBE = function (t, r) {
      return r || M(t, 8, this.length), e.read(this, t, !1, 52, 8)
    }, f.prototype.writeUIntLE = function (t, r, e, n) {
      (t = +t, r |= 0, e |= 0, n) || k(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
      var i = 1,
        o = 0;
      for (this[r] = 255 & t; ++o < e && (i *= 256);) this[r + o] = t / i & 255;
      return r + e
    }, f.prototype.writeUIntBE = function (t, r, e, n) {
      (t = +t, r |= 0, e |= 0, n) || k(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
      var i = e - 1,
        o = 1;
      for (this[r + i] = 255 & t; --i >= 0 && (o *= 256);) this[r + i] = t / o & 255;
      return r + e
    }, f.prototype.writeUInt8 = function (t, r, e) {
      return t = +t, r |= 0, e || k(this, t, r, 1, 255, 0), f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[r] = 255 & t, r + 1
    }, f.prototype.writeUInt16LE = function (t, r, e) {
      return t = +t, r |= 0, e || k(this, t, r, 2, 65535, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & t, this[r + 1] = t >>> 8) : N(this, t, r, !0), r + 2
    }, f.prototype.writeUInt16BE = function (t, r, e) {
      return t = +t, r |= 0, e || k(this, t, r, 2, 65535, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 8, this[r + 1] = 255 & t) : N(this, t, r, !1), r + 2
    }, f.prototype.writeUInt32LE = function (t, r, e) {
      return t = +t, r |= 0, e || k(this, t, r, 4, 4294967295, 0), f.TYPED_ARRAY_SUPPORT ? (this[r + 3] = t >>> 24, this[r + 2] = t >>> 16, this[r + 1] = t >>> 8, this[r] = 255 & t) : z(this, t, r, !0), r + 4
    }, f.prototype.writeUInt32BE = function (t, r, e) {
      return t = +t, r |= 0, e || k(this, t, r, 4, 4294967295, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t) : z(this, t, r, !1), r + 4
    }, f.prototype.writeIntLE = function (t, r, e, n) {
      if (t = +t, r |= 0, !n) {
        var i = Math.pow(2, 8 * e - 1);
        k(this, t, r, e, i - 1, -i)
      }
      var o = 0,
        u = 1,
        f = 0;
      for (this[r] = 255 & t; ++o < e && (u *= 256);) t < 0 && 0 === f && 0 !== this[r + o - 1] && (f = 1), this[r + o] = (t / u >> 0) - f & 255;
      return r + e
    }, f.prototype.writeIntBE = function (t, r, e, n) {
      if (t = +t, r |= 0, !n) {
        var i = Math.pow(2, 8 * e - 1);
        k(this, t, r, e, i - 1, -i)
      }
      var o = e - 1,
        u = 1,
        f = 0;
      for (this[r + o] = 255 & t; --o >= 0 && (u *= 256);) t < 0 && 0 === f && 0 !== this[r + o + 1] && (f = 1), this[r + o] = (t / u >> 0) - f & 255;
      return r + e
    }, f.prototype.writeInt8 = function (t, r, e) {
      return t = +t, r |= 0, e || k(this, t, r, 1, 127, -128), f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[r] = 255 & t, r + 1
    }, f.prototype.writeInt16LE = function (t, r, e) {
      return t = +t, r |= 0, e || k(this, t, r, 2, 32767, -32768), f.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & t, this[r + 1] = t >>> 8) : N(this, t, r, !0), r + 2
    }, f.prototype.writeInt16BE = function (t, r, e) {
      return t = +t, r |= 0, e || k(this, t, r, 2, 32767, -32768), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 8, this[r + 1] = 255 & t) : N(this, t, r, !1), r + 2
    }, f.prototype.writeInt32LE = function (t, r, e) {
      return t = +t, r |= 0, e || k(this, t, r, 4, 2147483647, -2147483648), f.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & t, this[r + 1] = t >>> 8, this[r + 2] = t >>> 16, this[r + 3] = t >>> 24) : z(this, t, r, !0), r + 4
    }, f.prototype.writeInt32BE = function (t, r, e) {
      return t = +t, r |= 0, e || k(this, t, r, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t) : z(this, t, r, !1), r + 4
    }, f.prototype.writeFloatLE = function (t, r, e) {
      return j(this, t, r, !0, e)
    }, f.prototype.writeFloatBE = function (t, r, e) {
      return j(this, t, r, !1, e)
    }, f.prototype.writeDoubleLE = function (t, r, e) {
      return q(this, t, r, !0, e)
    }, f.prototype.writeDoubleBE = function (t, r, e) {
      return q(this, t, r, !1, e)
    }, f.prototype.copy = function (t, r, e, n) {
      if (e || (e = 0), n || 0 === n || (n = this.length), r >= t.length && (r = t.length), r || (r = 0), n > 0 && n < e && (n = e), n === e) return 0;
      if (0 === t.length || 0 === this.length) return 0;
      if (r < 0) throw new RangeError("targetStart out of bounds");
      if (e < 0 || e >= this.length) throw new RangeError("sourceStart out of bounds");
      if (n < 0) throw new RangeError("sourceEnd out of bounds");
      n > this.length && (n = this.length), t.length - r < n - e && (n = t.length - r + e);
      var i, o = n - e;
      if (this === t && e < r && r < n)
        for (i = o - 1; i >= 0; --i) t[i + r] = this[i + e];
      else if (o < 1e3 || !f.TYPED_ARRAY_SUPPORT)
        for (i = 0; i < o; ++i) t[i + r] = this[i + e];
      else Uint8Array.prototype.set.call(t, this.subarray(e, e + o), r);
      return o
    }, f.prototype.fill = function (t, r, e, n) {
      if ("string" == typeof t) {
        if ("string" == typeof r ? (n = r, r = 0, e = this.length) : "string" == typeof e && (n = e, e = this.length), 1 === t.length) {
          var i = t.charCodeAt(0);
          i < 256 && (t = i)
        }
        if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
        if ("string" == typeof n && !f.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
      } else "number" == typeof t && (t &= 255);
      if (r < 0 || this.length < r || this.length < e) throw new RangeError("Out of range index");
      if (e <= r) return this;
      var o;
      if (r >>>= 0, e = void 0 === e ? this.length : e >>> 0, t || (t = 0), "number" == typeof t)
        for (o = r; o < e; ++o) this[o] = t;
      else {
        var u = f.isBuffer(t) ? t : $(new f(t, n).toString()),
          s = u.length;
        for (o = 0; o < e - r; ++o) this[o + r] = u[o % s]
      }
      return this
    };
    var V = /[^+\/0-9A-Za-z-_]/g;

    function X(t) {
      if ((t = J(t).replace(V, "")).length < 2) return "";
      for (; t.length % 4 != 0;) t += "=";
      return t
    }

    function J(t) {
      return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
    }

    function Z(t) {
      return t < 16 ? "0" + t.toString(16) : t.toString(16)
    }

    function $(t, r) {
      var e;
      r = r || 1 / 0;
      for (var n = t.length, i = null, o = [], u = 0; u < n; ++u) {
        if ((e = t.charCodeAt(u)) > 55295 && e < 57344) {
          if (!i) {
            if (e > 56319) {
              (r -= 3) > -1 && o.push(239, 191, 189);
              continue
            }
            if (u + 1 === n) {
              (r -= 3) > -1 && o.push(239, 191, 189);
              continue
            }
            i = e;
            continue
          }
          if (e < 56320) {
            (r -= 3) > -1 && o.push(239, 191, 189), i = e;
            continue
          }
          e = 65536 + (i - 55296 << 10 | e - 56320)
        } else i && (r -= 3) > -1 && o.push(239, 191, 189);
        if (i = null, e < 128) {
          if ((r -= 1) < 0) break;
          o.push(e)
        } else if (e < 2048) {
          if ((r -= 2) < 0) break;
          o.push(e >> 6 | 192, 63 & e | 128)
        } else if (e < 65536) {
          if ((r -= 3) < 0) break;
          o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128)
        } else {
          if (!(e < 1114112)) throw new Error("Invalid code point");
          if ((r -= 4) < 0) break;
          o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128)
        }
      }
      return o
    }

    function G(t) {
      for (var r = [], e = 0; e < t.length; ++e) r.push(255 & t.charCodeAt(e));
      return r
    }

    function H(t, r) {
      for (var e, n, i, o = [], u = 0; u < t.length && !((r -= 2) < 0); ++u) n = (e = t.charCodeAt(u)) >> 8, i = e % 256, o.push(i), o.push(n);
      return o
    }

    function K(t) {
      return r.toByteArray(X(t))
    }

    function Q(t, r, e, n) {
      for (var i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i) r[i + e] = t[i];
      return i
    }

    function W(t) {
      return t != t
    }
  }, {
    "base64-js": "FRly",
    "ieee754": "Quj6",
    "isarray": "aq/z",
    "buffer": "aMB2"
  }],
  "+OqZ": [function (require, module, exports) {
    var global = arguments[3];
    var Buffer = require("buffer").Buffer;
    var e = arguments[3],
      r = require("buffer").Buffer,
      t = exports;

    function n(e, r, t) {
      for (var n = Object.keys(r), o = 0; o < n.length; ++o) void 0 !== e[n[o]] && t || (e[n[o]] = r[n[o]]);
      return e
    }

    function o(e) {
      function r(e, t) {
        if (!(this instanceof r)) return new r(e, t);
        Object.defineProperty(this, "message", {
          get: function () {
            return e
          }
        }), Error.captureStackTrace ? Error.captureStackTrace(this, r) : Object.defineProperty(this, "stack", {
          value: (new Error).stack || ""
        }), t && n(this, t)
      }
      return (r.prototype = Object.create(Error.prototype)).constructor = r, Object.defineProperty(r.prototype, "name", {
        get: function () {
          return e
        }
      }), r.prototype.toString = function () {
        return this.name + ": " + this.message
      }, r
    }
    t.asPromise = require("@protobufjs/aspromise"), t.base64 = require("@protobufjs/base64"), t.EventEmitter = require("@protobufjs/eventemitter"), t.float = require("@protobufjs/float"), t.inquire = require("@protobufjs/inquire"), t.utf8 = require("@protobufjs/utf8"), t.pool = require("@protobufjs/pool"), t.LongBits = require("./longbits"), t.global = "undefined" != typeof window && window || void 0 !== e && e || "undefined" != typeof self && self || this, t.emptyArray = Object.freeze ? Object.freeze([]) : [], t.emptyObject = Object.freeze ? Object.freeze({}) : {}, t.isNode = Boolean(t.global.process && t.global.process.versions && t.global.process.versions.node), t.isInteger = Number.isInteger || function (e) {
      return "number" == typeof e && isFinite(e) && Math.floor(e) === e
    }, t.isString = function (e) {
      return "string" == typeof e || e instanceof String
    }, t.isObject = function (e) {
      return e && "object" == typeof e
    }, t.isset = t.isSet = function (e, r) {
      var t = e[r];
      return !(null == t || !e.hasOwnProperty(r)) && ("object" != typeof t || (Array.isArray(t) ? t.length : Object.keys(t).length) > 0)
    }, t.Buffer = function () {
      try {
        var e = t.inquire("buffer").Buffer;
        return e.prototype.utf8Write ? e : null
      } catch (r) {
        return null
      }
    }(), t._Buffer_from = null, t._Buffer_allocUnsafe = null, t.newBuffer = function (e) {
      return "number" == typeof e ? t.Buffer ? t._Buffer_allocUnsafe(e) : new t.Array(e) : t.Buffer ? t._Buffer_from(e) : "undefined" == typeof Uint8Array ? e : new Uint8Array(e)
    }, t.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array, t.Long = t.global.dcodeIO && t.global.dcodeIO.Long || t.global.Long || t.inquire("long"), t.key2Re = /^true|false|0|1$/, t.key32Re = /^-?(?:0|[1-9][0-9]*)$/, t.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/, t.longToHash = function (e) {
      return e ? t.LongBits.from(e).toHash() : t.LongBits.zeroHash
    }, t.longFromHash = function (e, r) {
      var n = t.LongBits.fromHash(e);
      return t.Long ? t.Long.fromBits(n.lo, n.hi, r) : n.toNumber(Boolean(r))
    }, t.merge = n, t.lcFirst = function (e) {
      return e.charAt(0).toLowerCase() + e.substring(1)
    }, t.newError = o, t.ProtocolError = o("ProtocolError"), t.oneOfGetter = function (e) {
      for (var r = {}, t = 0; t < e.length; ++t) r[e[t]] = 1;
      return function () {
        for (var e = Object.keys(this), t = e.length - 1; t > -1; --t)
          if (1 === r[e[t]] && void 0 !== this[e[t]] && null !== this[e[t]]) return e[t]
      }
    }, t.oneOfSetter = function (e) {
      return function (r) {
        for (var t = 0; t < e.length; ++t) e[t] !== r && delete this[e[t]]
      }
    }, t.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: !0
    }, t._configure = function () {
      var e = t.Buffer;
      e ? (t._Buffer_from = e.from !== Uint8Array.from && e.from || function (r, t) {
        return new e(r, t)
      }, t._Buffer_allocUnsafe = e.allocUnsafe || function (r) {
        return new e(r)
      }) : t._Buffer_from = t._Buffer_allocUnsafe = null
    };
  }, {
    "@protobufjs/aspromise": "Gmhw",
    "@protobufjs/base64": "20Fs",
    "@protobufjs/eventemitter": "fTab",
    "@protobufjs/float": "M11I",
    "@protobufjs/inquire": "MXG9",
    "@protobufjs/utf8": "HIDA",
    "@protobufjs/pool": "0yq+",
    "./longbits": "mM8D",
    "buffer": "aMB2"
  }],
  "uteQ": [function (require, module, exports) {
    "use strict";
    module.exports = u;
    var t, i = require("./util/minimal"),
      n = i.LongBits,
      e = i.base64,
      o = i.utf8;

    function r(t, i, n) {
      this.fn = t, this.len = i, this.next = void 0, this.val = n
    }

    function s() {}

    function h(t) {
      this.head = t.head, this.tail = t.tail, this.len = t.len, this.next = t.states
    }

    function u() {
      this.len = 0, this.head = new r(s, 0, 0), this.tail = this.head, this.states = null
    }

    function l(t, i, n) {
      i[n] = 255 & t
    }

    function p(t, i, n) {
      for (; t > 127;) i[n++] = 127 & t | 128, t >>>= 7;
      i[n] = t
    }

    function a(t, i) {
      this.len = t, this.next = void 0, this.val = i
    }

    function f(t, i, n) {
      for (; t.hi;) i[n++] = 127 & t.lo | 128, t.lo = (t.lo >>> 7 | t.hi << 25) >>> 0, t.hi >>>= 7;
      for (; t.lo > 127;) i[n++] = 127 & t.lo | 128, t.lo = t.lo >>> 7;
      i[n++] = t.lo
    }

    function c(t, i, n) {
      i[n] = 255 & t, i[n + 1] = t >>> 8 & 255, i[n + 2] = t >>> 16 & 255, i[n + 3] = t >>> 24
    }
    u.create = i.Buffer ? function () {
      return (u.create = function () {
        return new t
      })()
    } : function () {
      return new u
    }, u.alloc = function (t) {
      return new i.Array(t)
    }, i.Array !== Array && (u.alloc = i.pool(u.alloc, i.Array.prototype.subarray)), u.prototype._push = function (t, i, n) {
      return this.tail = this.tail.next = new r(t, i, n), this.len += i, this
    }, a.prototype = Object.create(r.prototype), a.prototype.fn = p, u.prototype.uint32 = function (t) {
      return this.len += (this.tail = this.tail.next = new a((t >>>= 0) < 128 ? 1 : t < 16384 ? 2 : t < 2097152 ? 3 : t < 268435456 ? 4 : 5, t)).len, this
    }, u.prototype.int32 = function (t) {
      return t < 0 ? this._push(f, 10, n.fromNumber(t)) : this.uint32(t)
    }, u.prototype.sint32 = function (t) {
      return this.uint32((t << 1 ^ t >> 31) >>> 0)
    }, u.prototype.uint64 = function (t) {
      var i = n.from(t);
      return this._push(f, i.length(), i)
    }, u.prototype.int64 = u.prototype.uint64, u.prototype.sint64 = function (t) {
      var i = n.from(t).zzEncode();
      return this._push(f, i.length(), i)
    }, u.prototype.bool = function (t) {
      return this._push(l, 1, t ? 1 : 0)
    }, u.prototype.fixed32 = function (t) {
      return this._push(c, 4, t >>> 0)
    }, u.prototype.sfixed32 = u.prototype.fixed32, u.prototype.fixed64 = function (t) {
      var i = n.from(t);
      return this._push(c, 4, i.lo)._push(c, 4, i.hi)
    }, u.prototype.sfixed64 = u.prototype.fixed64, u.prototype.float = function (t) {
      return this._push(i.float.writeFloatLE, 4, t)
    }, u.prototype.double = function (t) {
      return this._push(i.float.writeDoubleLE, 8, t)
    };
    var y = i.Array.prototype.set ? function (t, i, n) {
      i.set(t, n)
    } : function (t, i, n) {
      for (var e = 0; e < t.length; ++e) i[n + e] = t[e]
    };
    u.prototype.bytes = function (t) {
      var n = t.length >>> 0;
      if (!n) return this._push(l, 1, 0);
      if (i.isString(t)) {
        var o = u.alloc(n = e.length(t));
        e.decode(t, o, 0), t = o
      }
      return this.uint32(n)._push(y, n, t)
    }, u.prototype.string = function (t) {
      var i = o.length(t);
      return i ? this.uint32(i)._push(o.write, i, t) : this._push(l, 1, 0)
    }, u.prototype.fork = function () {
      return this.states = new h(this), this.head = this.tail = new r(s, 0, 0), this.len = 0, this
    }, u.prototype.reset = function () {
      return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new r(s, 0, 0), this.len = 0), this
    }, u.prototype.ldelim = function () {
      var t = this.head,
        i = this.tail,
        n = this.len;
      return this.reset().uint32(n), n && (this.tail.next = t.next, this.tail = i, this.len += n), this
    }, u.prototype.finish = function () {
      for (var t = this.head.next, i = this.constructor.alloc(this.len), n = 0; t;) t.fn(t.val, i, n), n += t.len, t = t.next;
      return i
    }, u._configure = function (i) {
      t = i
    };
  }, {
    "./util/minimal": "+OqZ"
  }],
  "CkBE": [function (require, module, exports) {

    "use strict";
    module.exports = n;
    var t = require("./writer");
    (n.prototype = Object.create(t.prototype)).constructor = n;
    var e = require("./util/minimal"),
      r = e.Buffer;

    function n() {
      t.call(this)
    }
    n.alloc = function (t) {
      return (n.alloc = e._Buffer_allocUnsafe)(t)
    };
    var i = r && r.prototype instanceof Uint8Array && "set" === r.prototype.set.name ? function (t, e, r) {
      e.set(t, r)
    } : function (t, e, r) {
      if (t.copy) t.copy(e, r, 0, t.length);
      else
        for (var n = 0; n < t.length;) e[r++] = t[n++]
    };

    function o(t, r, n) {
      t.length < 40 ? e.utf8.write(t, r, n) : r.utf8Write(t, n)
    }
    n.prototype.bytes = function (t) {
      e.isString(t) && (t = e._Buffer_from(t, "base64"));
      var r = t.length >>> 0;
      return this.uint32(r), r && this._push(i, r, t), this
    }, n.prototype.string = function (t) {
      var e = r.byteLength(t);
      return this.uint32(e), e && this._push(o, e, t), this
    };
  }, {
    "./writer": "uteQ",
    "./util/minimal": "+OqZ"
  }],
  "nX4I": [function (require, module, exports) {
    "use strict";
    module.exports = h;
    var t, i = require("./util/minimal"),
      s = i.LongBits,
      r = i.utf8;

    function o(t, i) {
      return RangeError("index out of range: " + t.pos + " + " + (i || 1) + " > " + t.len)
    }

    function h(t) {
      this.buf = t, this.pos = 0, this.len = t.length
    }
    var n = "undefined" != typeof Uint8Array ? function (t) {
      if (t instanceof Uint8Array || Array.isArray(t)) return new h(t);
      throw Error("illegal buffer")
    } : function (t) {
      if (Array.isArray(t)) return new h(t);
      throw Error("illegal buffer")
    };

    function e() {
      var t = new s(0, 0),
        i = 0;
      if (!(this.len - this.pos > 4)) {
        for (; i < 3; ++i) {
          if (this.pos >= this.len) throw o(this);
          if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 7 * i) >>> 0, this.buf[this.pos++] < 128) return t
        }
        return t.lo = (t.lo | (127 & this.buf[this.pos++]) << 7 * i) >>> 0, t
      }
      for (; i < 4; ++i)
        if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 7 * i) >>> 0, this.buf[this.pos++] < 128) return t;
      if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 28) >>> 0, t.hi = (t.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, this.buf[this.pos++] < 128) return t;
      if (i = 0, this.len - this.pos > 4) {
        for (; i < 5; ++i)
          if (t.hi = (t.hi | (127 & this.buf[this.pos]) << 7 * i + 3) >>> 0, this.buf[this.pos++] < 128) return t
      } else
        for (; i < 5; ++i) {
          if (this.pos >= this.len) throw o(this);
          if (t.hi = (t.hi | (127 & this.buf[this.pos]) << 7 * i + 3) >>> 0, this.buf[this.pos++] < 128) return t
        }
      throw Error("invalid varint encoding")
    }

    function u(t, i) {
      return (t[i - 4] | t[i - 3] << 8 | t[i - 2] << 16 | t[i - 1] << 24) >>> 0
    }

    function f() {
      if (this.pos + 8 > this.len) throw o(this, 8);
      return new s(u(this.buf, this.pos += 4), u(this.buf, this.pos += 4))
    }
    h.create = i.Buffer ? function (s) {
      return (h.create = function (s) {
        return i.Buffer.isBuffer(s) ? new t(s) : n(s)
      })(s)
    } : n, h.prototype._slice = i.Array.prototype.subarray || i.Array.prototype.slice, h.prototype.uint32 = function () {
      var t = 4294967295;
      return function () {
        if (t = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128) return t;
        if (t = (t | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128) return t;
        if (t = (t | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128) return t;
        if (t = (t | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128) return t;
        if (t = (t | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128) return t;
        if ((this.pos += 5) > this.len) throw this.pos = this.len, o(this, 10);
        return t
      }
    }(), h.prototype.int32 = function () {
      return 0 | this.uint32()
    }, h.prototype.sint32 = function () {
      var t = this.uint32();
      return t >>> 1 ^ -(1 & t) | 0
    }, h.prototype.bool = function () {
      return 0 !== this.uint32()
    }, h.prototype.fixed32 = function () {
      if (this.pos + 4 > this.len) throw o(this, 4);
      return u(this.buf, this.pos += 4)
    }, h.prototype.sfixed32 = function () {
      if (this.pos + 4 > this.len) throw o(this, 4);
      return 0 | u(this.buf, this.pos += 4)
    }, h.prototype.float = function () {
      if (this.pos + 4 > this.len) throw o(this, 4);
      var t = i.float.readFloatLE(this.buf, this.pos);
      return this.pos += 4, t
    }, h.prototype.double = function () {
      if (this.pos + 8 > this.len) throw o(this, 4);
      var t = i.float.readDoubleLE(this.buf, this.pos);
      return this.pos += 8, t
    }, h.prototype.bytes = function () {
      var t = this.uint32(),
        i = this.pos,
        s = this.pos + t;
      if (s > this.len) throw o(this, t);
      return this.pos += t, Array.isArray(this.buf) ? this.buf.slice(i, s) : i === s ? new this.buf.constructor(0) : this._slice.call(this.buf, i, s)
    }, h.prototype.string = function () {
      var t = this.bytes();
      return r.read(t, 0, t.length)
    }, h.prototype.skip = function (t) {
      if ("number" == typeof t) {
        if (this.pos + t > this.len) throw o(this, t);
        this.pos += t
      } else
        do {
          if (this.pos >= this.len) throw o(this)
        } while (128 & this.buf[this.pos++]);
      return this
    }, h.prototype.skipType = function (t) {
      switch (t) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          for (; 4 != (t = 7 & this.uint32());) this.skipType(t);
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + t + " at offset " + this.pos)
      }
      return this
    }, h._configure = function (s) {
      t = s;
      var r = i.Long ? "toLong" : "toNumber";
      i.merge(h.prototype, {
        int64: function () {
          return e.call(this)[r](!1)
        },
        uint64: function () {
          return e.call(this)[r](!0)
        },
        sint64: function () {
          return e.call(this).zzDecode()[r](!1)
        },
        fixed64: function () {
          return f.call(this)[r](!0)
        },
        sfixed64: function () {
          return f.call(this)[r](!1)
        }
      })
    };
  }, {
    "./util/minimal": "+OqZ"
  }],
  "4pJQ": [function (require, module, exports) {
    "use strict";
    module.exports = r;
    var t = require("./reader");
    (r.prototype = Object.create(t.prototype)).constructor = r;
    var e = require("./util/minimal");

    function r(e) {
      t.call(this, e)
    }
    e.Buffer && (r.prototype._slice = e.Buffer.prototype.slice), r.prototype.string = function () {
      var t = this.uint32();
      return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + t, this.len))
    };
  }, {
    "./reader": "nX4I",
    "./util/minimal": "+OqZ"
  }],
  "uviC": [function (require, module, exports) {
    "use strict";
    module.exports = t;
    var e = require("../util/minimal");

    function t(t, r, i) {
      if ("function" != typeof t) throw TypeError("rpcImpl must be a function");
      e.EventEmitter.call(this), this.rpcImpl = t, this.requestDelimited = Boolean(r), this.responseDelimited = Boolean(i)
    }(t.prototype = Object.create(e.EventEmitter.prototype)).constructor = t, t.prototype.rpcCall = function t(r, i, n, o, l) {
      if (!o) throw TypeError("request must be specified");
      var u = this;
      if (!l) return e.asPromise(t, u, r, i, n, o);
      if (u.rpcImpl) try {
        return u.rpcImpl(r, i[u.requestDelimited ? "encodeDelimited" : "encode"](o).finish(), function (e, t) {
          if (e) return u.emit("error", e, r), l(e);
          if (null !== t) {
            if (!(t instanceof n)) try {
              t = n[u.responseDelimited ? "decodeDelimited" : "decode"](t)
            } catch (e) {
              return u.emit("error", e, r), l(e)
            }
            return u.emit("data", t, r), l(null, t)
          }
          u.end(!0)
        })
      } catch (c) {
        return u.emit("error", c, r), void setTimeout(function () {
          l(c)
        }, 0)
      } else setTimeout(function () {
        l(Error("already ended"))
      }, 0)
    }, t.prototype.end = function (e) {
      return this.rpcImpl && (e || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this
    };
  }, {
    "../util/minimal": "+OqZ"
  }],
  "j3cJ": [function (require, module, exports) {
    "use strict";
    var e = exports;
    e.Service = require("./rpc/service");
  }, {
    "./rpc/service": "uviC"
  }],
  "S/PD": [function (require, module, exports) {
    "use strict";
    module.exports = {};
  }, {}],
  "6BiI": [function (require, module, exports) {
    "use strict";
    var r = exports;

    function e() {
      r.Reader._configure(r.BufferReader), r.util._configure()
    }
    r.build = "minimal", r.Writer = require("./writer"), r.BufferWriter = require("./writer_buffer"), r.Reader = require("./reader"), r.BufferReader = require("./reader_buffer"), r.util = require("./util/minimal"), r.rpc = require("./rpc"), r.roots = require("./roots"), r.configure = e, r.Writer._configure(r.BufferWriter), e();
  }, {
    "./writer": "uteQ",
    "./writer_buffer": "CkBE",
    "./reader": "nX4I",
    "./reader_buffer": "4pJQ",
    "./util/minimal": "+OqZ",
    "./rpc": "j3cJ",
    "./roots": "S/PD"
  }],
  "YmP9": [function (require, module, exports) {
    "use strict";

    function r(n, e) {
      "string" == typeof n && (e = n, n = void 0);
      var t = [];

      function o(n) {
        if ("string" != typeof n) {
          var e = i();
          if (r.verbose && console.log("codegen: " + e), e = "return " + e, n) {
            for (var u = Object.keys(n), a = new Array(u.length + 1), c = new Array(u.length), s = 0; s < u.length;) a[s] = u[s], c[s] = n[u[s++]];
            return a[s] = e, Function.apply(null, a).apply(null, c)
          }
          return Function(e)()
        }
        for (var l = new Array(arguments.length - 1), f = 0; f < l.length;) l[f] = arguments[++f];
        if (f = 0, n = n.replace(/%([%dfijs])/g, function (r, n) {
            var e = l[f++];
            switch (n) {
              case "d":
              case "f":
                return String(Number(e));
              case "i":
                return String(Math.floor(e));
              case "j":
                return JSON.stringify(e);
              case "s":
                return String(e)
            }
            return "%"
          }), f !== l.length) throw Error("parameter count mismatch");
        return t.push(n), o
      }

      function i(r) {
        return "function " + (r || e || "") + "(" + (n && n.join(",") || "") + "){\n  " + t.join("\n  ") + "\n}"
      }
      return o.toString = i, o
    }
    module.exports = r, r.verbose = !1;
  }, {}],
  "h5wE": [function (require, module, exports) {
    "use strict";
    module.exports = n;
    var e = require("@protobufjs/aspromise"),
      r = require("@protobufjs/inquire"),
      t = r("fs");

    function n(r, s, i) {
      return "function" == typeof s ? (i = s, s = {}) : s || (s = {}), i ? !s.xhr && t && t.readFile ? t.readFile(r, function (e, t) {
        return e && "undefined" != typeof XMLHttpRequest ? n.xhr(r, s, i) : e ? i(e) : i(null, s.binary ? t : t.toString("utf8"))
      }) : n.xhr(r, s, i) : e(n, this, r, s)
    }
    n.xhr = function (e, r, t) {
      var n = new XMLHttpRequest;
      n.onreadystatechange = function () {
        if (4 === n.readyState) {
          if (0 !== n.status && 200 !== n.status) return t(Error("status " + n.status));
          if (r.binary) {
            var e = n.response;
            if (!e) {
              e = [];
              for (var s = 0; s < n.responseText.length; ++s) e.push(255 & n.responseText.charCodeAt(s))
            }
            return t(null, "undefined" != typeof Uint8Array ? new Uint8Array(e) : e)
          }
          return t(null, n.responseText)
        }
      }, r.binary && ("overrideMimeType" in n && n.overrideMimeType("text/plain; charset=x-user-defined"), n.responseType = "arraybuffer"), n.open("GET", e), n.send()
    };
  }, {
    "@protobufjs/aspromise": "Gmhw",
    "@protobufjs/inquire": "MXG9"
  }],
  "Mao7": [function (require, module, exports) {
    "use strict";
    var e = exports,
      r = e.isAbsolute = function (e) {
        return /^(?:\/|\w+:)/.test(e)
      },
      t = e.normalize = function (e) {
        var t = (e = e.replace(/\\/g, "/").replace(/\/{2,}/g, "/")).split("/"),
          n = r(e),
          i = "";
        n && (i = t.shift() + "/");
        for (var l = 0; l < t.length;) ".." === t[l] ? l > 0 && ".." !== t[l - 1] ? t.splice(--l, 2) : n ? t.splice(l, 1) : ++l : "." === t[l] ? t.splice(l, 1) : ++l;
        return i + t.join("/")
      };
    e.resolve = function (e, n, i) {
      return i || (n = t(n)), r(n) ? n : (i || (e = t(e)), (e = e.replace(/(?:\/|^)[^\/]+$/, "")).length ? t(e + "/" + n) : n)
    };
  }, {}],
  "eiCH": [function (require, module, exports) {
    "use strict";
    var t = exports,
      e = require("./util"),
      i = ["double", "float", "int32", "uint32", "sint32", "fixed32", "sfixed32", "int64", "uint64", "sint64", "fixed64", "sfixed64", "bool", "string", "bytes"];

    function n(t, e) {
      var n = 0,
        r = {};
      for (e |= 0; n < t.length;) r[i[n + e]] = t[n++];
      return r
    }
    t.basic = n([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2, 2]), t.defaults = n([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, !1, "", e.emptyArray, null]), t.long = n([0, 0, 0, 1, 1], 7), t.mapKey = n([0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2], 2), t.packed = n([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0]);
  }, {
    "./util": "CVja"
  }],
  "+iVu": [function (require, module, exports) {
    "use strict";
    module.exports = n;
    var t = require("./object");
    ((n.prototype = Object.create(t.prototype)).constructor = n).className = "Field";
    var e, i = require("./enum"),
      s = require("./types"),
      o = require("./util"),
      r = /^required|optional|repeated$/;

    function n(e, i, n, p, l, u, a) {
      if (o.isObject(p) ? (a = l, u = p, p = l = void 0) : o.isObject(l) && (a = u, u = l, l = void 0), t.call(this, e, u), !o.isInteger(i) || i < 0) throw TypeError("id must be a non-negative integer");
      if (!o.isString(n)) throw TypeError("type must be a string");
      if (void 0 !== p && !r.test(p = p.toString().toLowerCase())) throw TypeError("rule must be a string rule");
      if (void 0 !== l && !o.isString(l)) throw TypeError("extend must be a string");
      this.rule = p && "optional" !== p ? p : void 0, this.type = n, this.id = i, this.extend = l || void 0, this.required = "required" === p, this.optional = !this.required, this.repeated = "repeated" === p, this.map = !1, this.message = null, this.partOf = null, this.typeDefault = null, this.defaultValue = null, this.long = !!o.Long && void 0 !== s.long[n], this.bytes = "bytes" === n, this.resolvedType = null, this.extensionField = null, this.declaringField = null, this._packed = null, this.comment = a
    }
    n.fromJSON = function (t, e) {
      return new n(t, e.id, e.type, e.rule, e.extend, e.options, e.comment)
    }, Object.defineProperty(n.prototype, "packed", {
      get: function () {
        return null === this._packed && (this._packed = !1 !== this.getOption("packed")), this._packed
      }
    }), n.prototype.setOption = function (e, i, s) {
      return "packed" === e && (this._packed = null), t.prototype.setOption.call(this, e, i, s)
    }, n.prototype.toJSON = function (t) {
      var e = !!t && Boolean(t.keepComments);
      return o.toObject(["rule", "optional" !== this.rule && this.rule || void 0, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", e ? this.comment : void 0])
    }, n.prototype.resolve = function () {
      if (this.resolved) return this;
      if (void 0 === (this.typeDefault = s.defaults[this.type]) && (this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type), this.resolvedType instanceof e ? this.typeDefault = null : this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]), this.options && null != this.options.default && (this.typeDefault = this.options.default, this.resolvedType instanceof i && "string" == typeof this.typeDefault && (this.typeDefault = this.resolvedType.values[this.typeDefault])), this.options && (!0 !== this.options.packed && (void 0 === this.options.packed || !this.resolvedType || this.resolvedType instanceof i) || delete this.options.packed, Object.keys(this.options).length || (this.options = void 0)), this.long) this.typeDefault = o.Long.fromNumber(this.typeDefault, "u" === this.type.charAt(0)), Object.freeze && Object.freeze(this.typeDefault);
      else if (this.bytes && "string" == typeof this.typeDefault) {
        var r;
        o.base64.test(this.typeDefault) ? o.base64.decode(this.typeDefault, r = o.newBuffer(o.base64.length(this.typeDefault)), 0) : o.utf8.write(this.typeDefault, r = o.newBuffer(o.utf8.length(this.typeDefault)), 0), this.typeDefault = r
      }
      return this.map ? this.defaultValue = o.emptyObject : this.repeated ? this.defaultValue = o.emptyArray : this.defaultValue = this.typeDefault, this.parent instanceof e && (this.parent.ctor.prototype[this.name] = this.defaultValue), t.prototype.resolve.call(this)
    }, n.d = function (t, e, i, s) {
      return "function" == typeof e ? e = o.decorateType(e).name : e && "object" == typeof e && (e = o.decorateEnum(e).name),
        function (r, p) {
          o.decorateType(r.constructor).add(new n(p, t, e, i, {
            default: s
          }))
        }
    }, n._configure = function (t) {
      e = t
    };
  }, {
    "./object": "lIB1",
    "./enum": "QVBM",
    "./types": "eiCH",
    "./util": "CVja"
  }],
  "Iv+k": [function (require, module, exports) {
    "use strict";
    module.exports = f;
    var t = require("./object");
    ((f.prototype = Object.create(t.prototype)).constructor = f).className = "Namespace";
    var e, r, n, o = require("./field"),
      i = require("./util");

    function s(t, e) {
      if (t && t.length) {
        for (var r = {}, n = 0; n < t.length; ++n) r[t[n].name] = t[n].toJSON(e);
        return r
      }
    }

    function f(e, r) {
      t.call(this, e, r), this.nested = void 0, this._nestedArray = null
    }

    function u(t) {
      return t._nestedArray = null, t
    }
    f.fromJSON = function (t, e) {
      return new f(t, e.options).addJSON(e.nested)
    }, f.arrayToJSON = s, f.isReservedId = function (t, e) {
      if (t)
        for (var r = 0; r < t.length; ++r)
          if ("string" != typeof t[r] && t[r][0] <= e && t[r][1] >= e) return !0;
      return !1
    }, f.isReservedName = function (t, e) {
      if (t)
        for (var r = 0; r < t.length; ++r)
          if (t[r] === e) return !0;
      return !1
    }, Object.defineProperty(f.prototype, "nestedArray", {
      get: function () {
        return this._nestedArray || (this._nestedArray = i.toArray(this.nested))
      }
    }), f.prototype.toJSON = function (t) {
      return i.toObject(["options", this.options, "nested", s(this.nestedArray, t)])
    }, f.prototype.addJSON = function (t) {
      if (t)
        for (var i, s = Object.keys(t), u = 0; u < s.length; ++u) i = t[s[u]], this.add((void 0 !== i.fields ? e.fromJSON : void 0 !== i.values ? n.fromJSON : void 0 !== i.methods ? r.fromJSON : void 0 !== i.id ? o.fromJSON : f.fromJSON)(s[u], i));
      return this
    }, f.prototype.get = function (t) {
      return this.nested && this.nested[t] || null
    }, f.prototype.getEnum = function (t) {
      if (this.nested && this.nested[t] instanceof n) return this.nested[t].values;
      throw Error("no such enum: " + t)
    }, f.prototype.add = function (t) {
      if (!(t instanceof o && void 0 !== t.extend || t instanceof e || t instanceof n || t instanceof r || t instanceof f)) throw TypeError("object must be a valid nested object");
      if (this.nested) {
        var i = this.get(t.name);
        if (i) {
          if (!(i instanceof f && t instanceof f) || i instanceof e || i instanceof r) throw Error("duplicate name '" + t.name + "' in " + this);
          for (var s = i.nestedArray, a = 0; a < s.length; ++a) t.add(s[a]);
          this.remove(i), this.nested || (this.nested = {}), t.setOptions(i.options, !0)
        }
      } else this.nested = {};
      return this.nested[t.name] = t, t.onAdd(this), u(this)
    }, f.prototype.remove = function (e) {
      if (!(e instanceof t)) throw TypeError("object must be a ReflectionObject");
      if (e.parent !== this) throw Error(e + " is not a member of " + this);
      return delete this.nested[e.name], Object.keys(this.nested).length || (this.nested = void 0), e.onRemove(this), u(this)
    }, f.prototype.define = function (t, e) {
      if (i.isString(t)) t = t.split(".");
      else if (!Array.isArray(t)) throw TypeError("illegal path");
      if (t && t.length && "" === t[0]) throw Error("path must be relative");
      for (var r = this; t.length > 0;) {
        var n = t.shift();
        if (r.nested && r.nested[n]) {
          if (!((r = r.nested[n]) instanceof f)) throw Error("path conflicts with non-namespace objects")
        } else r.add(r = new f(n))
      }
      return e && r.addJSON(e), r
    }, f.prototype.resolveAll = function () {
      for (var t = this.nestedArray, e = 0; e < t.length;) t[e] instanceof f ? t[e++].resolveAll() : t[e++].resolve();
      return this.resolve()
    }, f.prototype.lookup = function (t, e, r) {
      if ("boolean" == typeof e ? (r = e, e = void 0) : e && !Array.isArray(e) && (e = [e]), i.isString(t) && t.length) {
        if ("." === t) return this.root;
        t = t.split(".")
      } else if (!t.length) return this;
      if ("" === t[0]) return this.root.lookup(t.slice(1), e);
      var n = this.get(t[0]);
      if (n) {
        if (1 === t.length) {
          if (!e || e.indexOf(n.constructor) > -1) return n
        } else if (n instanceof f && (n = n.lookup(t.slice(1), e, !0))) return n
      } else
        for (var o = 0; o < this.nestedArray.length; ++o)
          if (this._nestedArray[o] instanceof f && (n = this._nestedArray[o].lookup(t, e, !0))) return n;
      return null === this.parent || r ? null : this.parent.lookup(t, e)
    }, f.prototype.lookupType = function (t) {
      var r = this.lookup(t, [e]);
      if (!r) throw Error("no such type: " + t);
      return r
    }, f.prototype.lookupEnum = function (t) {
      var e = this.lookup(t, [n]);
      if (!e) throw Error("no such Enum '" + t + "' in " + this);
      return e
    }, f.prototype.lookupTypeOrEnum = function (t) {
      var r = this.lookup(t, [e, n]);
      if (!r) throw Error("no such Type or Enum '" + t + "' in " + this);
      return r
    }, f.prototype.lookupService = function (t) {
      var e = this.lookup(t, [r]);
      if (!e) throw Error("no such Service '" + t + "' in " + this);
      return e
    }, f._configure = function (t, o, i) {
      e = t, r = o, n = i
    };
  }, {
    "./object": "lIB1",
    "./field": "+iVu",
    "./util": "CVja"
  }],
  "tCFY": [function (require, module, exports) {
    "use strict";
    module.exports = o;
    var e = require("./object");
    ((o.prototype = Object.create(e.prototype)).constructor = o).className = "OneOf";
    var t = require("./field"),
      r = require("./util");

    function o(t, r, o, n) {
      if (Array.isArray(r) || (o = r, r = void 0), e.call(this, t, o), void 0 !== r && !Array.isArray(r)) throw TypeError("fieldNames must be an Array");
      this.oneof = r || [], this.fieldsArray = [], this.comment = n
    }

    function n(e) {
      if (e.parent)
        for (var t = 0; t < e.fieldsArray.length; ++t) e.fieldsArray[t].parent || e.parent.add(e.fieldsArray[t])
    }
    o.fromJSON = function (e, t) {
      return new o(e, t.oneof, t.options, t.comment)
    }, o.prototype.toJSON = function (e) {
      var t = !!e && Boolean(e.keepComments);
      return r.toObject(["options", this.options, "oneof", this.oneof, "comment", t ? this.comment : void 0])
    }, o.prototype.add = function (e) {
      if (!(e instanceof t)) throw TypeError("field must be a Field");
      return e.parent && e.parent !== this.parent && e.parent.remove(e), this.oneof.push(e.name), this.fieldsArray.push(e), e.partOf = this, n(this), this
    }, o.prototype.remove = function (e) {
      if (!(e instanceof t)) throw TypeError("field must be a Field");
      var r = this.fieldsArray.indexOf(e);
      if (r < 0) throw Error(e + " is not a member of " + this);
      return this.fieldsArray.splice(r, 1), (r = this.oneof.indexOf(e.name)) > -1 && this.oneof.splice(r, 1), e.partOf = null, this
    }, o.prototype.onAdd = function (t) {
      e.prototype.onAdd.call(this, t);
      for (var r = 0; r < this.oneof.length; ++r) {
        var o = t.get(this.oneof[r]);
        o && !o.partOf && (o.partOf = this, this.fieldsArray.push(o))
      }
      n(this)
    }, o.prototype.onRemove = function (t) {
      for (var r, o = 0; o < this.fieldsArray.length; ++o)(r = this.fieldsArray[o]).parent && r.parent.remove(r);
      e.prototype.onRemove.call(this, t)
    }, o.d = function () {
      for (var e = new Array(arguments.length), t = 0; t < arguments.length;) e[t] = arguments[t++];
      return function (t, n) {
        r.decorateType(t.constructor).add(new o(n, e)), Object.defineProperty(t, n, {
          get: r.oneOfGetter(e),
          set: r.oneOfSetter(e)
        })
      }
    };
  }, {
    "./object": "lIB1",
    "./field": "+iVu",
    "./util": "CVja"
  }],
  "fBNh": [function (require, module, exports) {
    "use strict";
    module.exports = r;
    var e = require("./field");
    ((r.prototype = Object.create(e.prototype)).constructor = r).className = "MapField";
    var t = require("./types"),
      o = require("./util");

    function r(t, r, i, n, p, s) {
      if (e.call(this, t, r, n, void 0, void 0, p, s), !o.isString(i)) throw TypeError("keyType must be a string");
      this.keyType = i, this.resolvedKeyType = null, this.map = !0
    }
    r.fromJSON = function (e, t) {
      return new r(e, t.id, t.keyType, t.type, t.options, t.comment)
    }, r.prototype.toJSON = function (e) {
      var t = !!e && Boolean(e.keepComments);
      return o.toObject(["keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", t ? this.comment : void 0])
    }, r.prototype.resolve = function () {
      if (this.resolved) return this;
      if (void 0 === t.mapKey[this.keyType]) throw Error("invalid key type: " + this.keyType);
      return e.prototype.resolve.call(this)
    }, r.d = function (e, t, i) {
      return "function" == typeof i ? i = o.decorateType(i).name : i && "object" == typeof i && (i = o.decorateEnum(i).name),
        function (n, p) {
          o.decorateType(n.constructor).add(new r(p, e, t, i))
        }
    };
  }, {
    "./field": "+iVu",
    "./types": "eiCH",
    "./util": "CVja"
  }],
  "7LdZ": [function (require, module, exports) {
    "use strict";
    module.exports = s;
    var e = require("./object");
    ((s.prototype = Object.create(e.prototype)).constructor = s).className = "Method";
    var t = require("./util");

    function s(s, r, o, p, i, n, u, y) {
      if (t.isObject(i) ? (u = i, i = n = void 0) : t.isObject(n) && (u = n, n = void 0), void 0 !== r && !t.isString(r)) throw TypeError("type must be a string");
      if (!t.isString(o)) throw TypeError("requestType must be a string");
      if (!t.isString(p)) throw TypeError("responseType must be a string");
      e.call(this, s, u), this.type = r || "rpc", this.requestType = o, this.requestStream = !!i || void 0, this.responseType = p, this.responseStream = !!n || void 0, this.resolvedRequestType = null, this.resolvedResponseType = null, this.comment = y
    }
    s.fromJSON = function (e, t) {
      return new s(e, t.type, t.requestType, t.responseType, t.requestStream, t.responseStream, t.options, t.comment)
    }, s.prototype.toJSON = function (e) {
      var s = !!e && Boolean(e.keepComments);
      return t.toObject(["type", "rpc" !== this.type && this.type || void 0, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", s ? this.comment : void 0])
    }, s.prototype.resolve = function () {
      return this.resolved ? this : (this.resolvedRequestType = this.parent.lookupType(this.requestType), this.resolvedResponseType = this.parent.lookupType(this.responseType), e.prototype.resolve.call(this))
    };
  }, {
    "./object": "lIB1",
    "./util": "CVja"
  }],
  "FvRI": [function (require, module, exports) {
    "use strict";
    module.exports = s;
    var e = require("./namespace");
    ((s.prototype = Object.create(e.prototype)).constructor = s).className = "Service";
    var t = require("./method"),
      r = require("./util"),
      o = require("./rpc");

    function s(t, r) {
      e.call(this, t, r), this.methods = {}, this._methodsArray = null
    }

    function n(e) {
      return e._methodsArray = null, e
    }
    s.fromJSON = function (e, r) {
      var o = new s(e, r.options);
      if (r.methods)
        for (var n = Object.keys(r.methods), i = 0; i < n.length; ++i) o.add(t.fromJSON(n[i], r.methods[n[i]]));
      return r.nested && o.addJSON(r.nested), o.comment = r.comment, o
    }, s.prototype.toJSON = function (t) {
      var o = e.prototype.toJSON.call(this, t),
        s = !!t && Boolean(t.keepComments);
      return r.toObject(["options", o && o.options || void 0, "methods", e.arrayToJSON(this.methodsArray, t) || {}, "nested", o && o.nested || void 0, "comment", s ? this.comment : void 0])
    }, Object.defineProperty(s.prototype, "methodsArray", {
      get: function () {
        return this._methodsArray || (this._methodsArray = r.toArray(this.methods))
      }
    }), s.prototype.get = function (t) {
      return this.methods[t] || e.prototype.get.call(this, t)
    }, s.prototype.resolveAll = function () {
      for (var t = this.methodsArray, r = 0; r < t.length; ++r) t[r].resolve();
      return e.prototype.resolve.call(this)
    }, s.prototype.add = function (r) {
      if (this.get(r.name)) throw Error("duplicate name '" + r.name + "' in " + this);
      return r instanceof t ? (this.methods[r.name] = r, r.parent = this, n(this)) : e.prototype.add.call(this, r)
    }, s.prototype.remove = function (r) {
      if (r instanceof t) {
        if (this.methods[r.name] !== r) throw Error(r + " is not a member of " + this);
        return delete this.methods[r.name], r.parent = null, n(this)
      }
      return e.prototype.remove.call(this, r)
    }, s.prototype.create = function (e, t, s) {
      for (var n, i = new o.Service(e, t, s), a = 0; a < this.methodsArray.length; ++a) {
        var h = r.lcFirst((n = this._methodsArray[a]).resolve().name).replace(/[^$\w_]/g, "");
        i[h] = r.codegen(["r", "c"], r.isReserved(h) ? h + "_" : h)("return this.rpcCall(m,q,s,r,c)")({
          m: n,
          q: n.resolvedRequestType.ctor,
          s: n.resolvedResponseType.ctor
        })
      }
      return i
    };
  }, {
    "./namespace": "Iv+k",
    "./method": "7LdZ",
    "./util": "CVja",
    "./rpc": "j3cJ"
  }],
  "DGUL": [function (require, module, exports) {
    "use strict";
    module.exports = e;
    var t = require("./util/minimal");

    function e(t) {
      if (t)
        for (var e = Object.keys(t), i = 0; i < e.length; ++i) this[e[i]] = t[e[i]]
    }
    e.create = function (t) {
      return this.$type.create(t)
    }, e.encode = function (t, e) {
      return this.$type.encode(t, e)
    }, e.encodeDelimited = function (t, e) {
      return this.$type.encodeDelimited(t, e)
    }, e.decode = function (t) {
      return this.$type.decode(t)
    }, e.decodeDelimited = function (t) {
      return this.$type.decodeDelimited(t)
    }, e.verify = function (t) {
      return this.$type.verify(t)
    }, e.fromObject = function (t) {
      return this.$type.fromObject(t)
    }, e.toObject = function (t, e) {
      return this.$type.toObject(t, e)
    }, e.prototype.toJSON = function () {
      return this.$type.toObject(this, t.toJSONOptions)
    };
  }, {
    "./util/minimal": "+OqZ"
  }],
  "8DjC": [function (require, module, exports) {
    "use strict";
    module.exports = t;
    var e = require("./enum"),
      r = require("./types"),
      s = require("./util");

    function i(e) {
      return "missing required '" + e.name + "'"
    }

    function t(t) {
      var o = s.codegen(["r", "l"], t.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (t.fieldsArray.filter(function (e) {
        return e.map
      }).length ? ",k" : ""))("while(r.pos<c){")("var t=r.uint32()");
      t.group && o("if((t&7)===4)")("break"), o("switch(t>>>3){");
      for (var n = 0; n < t.fieldsArray.length; ++n) {
        var a = t._fieldsArray[n].resolve(),
          d = a.resolvedType instanceof e ? "int32" : a.type,
          p = "m" + s.safeProp(a.name);
        o("case %i:", a.id), a.map ? (o("r.skip().pos++")("if(%s===util.emptyObject)", p)("%s={}", p)("k=r.%s()", a.keyType)("r.pos++"), void 0 !== r.long[a.keyType] ? void 0 === r.basic[d] ? o('%s[typeof k==="object"?util.longToHash(k):k]=types[%i].decode(r,r.uint32())', p, n) : o('%s[typeof k==="object"?util.longToHash(k):k]=r.%s()', p, d) : void 0 === r.basic[d] ? o("%s[k]=types[%i].decode(r,r.uint32())", p, n) : o("%s[k]=r.%s()", p, d)) : a.repeated ? (o("if(!(%s&&%s.length))", p, p)("%s=[]", p), void 0 !== r.packed[d] && o("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", p, d)("}else"), void 0 === r.basic[d] ? o(a.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", p, n) : o("%s.push(r.%s())", p, d)) : void 0 === r.basic[d] ? o(a.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", p, n) : o("%s=r.%s()", p, d), o("break")
      }
      for (o("default:")("r.skipType(t&7)")("break")("}")("}"), n = 0; n < t._fieldsArray.length; ++n) {
        var u = t._fieldsArray[n];
        u.required && o("if(!m.hasOwnProperty(%j))", u.name)("throw util.ProtocolError(%j,{instance:m})", i(u))
      }
      return o("return m")
    }
  }, {
    "./enum": "QVBM",
    "./types": "eiCH",
    "./util": "CVja"
  }],
  "y8ff": [function (require, module, exports) {
    "use strict";
    module.exports = a;
    var e = require("./enum"),
      r = require("./util");

    function t(e, r) {
      return e.name + ": " + r + (e.repeated && "array" !== r ? "[]" : e.map && "object" !== r ? "{k:" + e.keyType + "}" : "") + " expected"
    }

    function s(r, s, i, a) {
      if (s.resolvedType)
        if (s.resolvedType instanceof e) {
          r("switch(%s){", a)("default:")("return%j", t(s, "enum value"));
          for (var n = Object.keys(s.resolvedType.values), u = 0; u < n.length; ++u) r("case %i:", s.resolvedType.values[n[u]]);
          r("break")("}")
        } else r("{")("var e=types[%i].verify(%s);", i, a)("if(e)")("return%j+e", s.name + ".")("}");
      else switch (s.type) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
          r("if(!util.isInteger(%s))", a)("return%j", t(s, "integer"));
          break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
          r("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", a, a, a, a)("return%j", t(s, "integer|Long"));
          break;
        case "float":
        case "double":
          r('if(typeof %s!=="number")', a)("return%j", t(s, "number"));
          break;
        case "bool":
          r('if(typeof %s!=="boolean")', a)("return%j", t(s, "boolean"));
          break;
        case "string":
          r("if(!util.isString(%s))", a)("return%j", t(s, "string"));
          break;
        case "bytes":
          r('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', a, a, a)("return%j", t(s, "buffer"))
      }
      return r
    }

    function i(e, r, s) {
      switch (r.keyType) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
          e("if(!util.key32Re.test(%s))", s)("return%j", t(r, "integer key"));
          break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
          e("if(!util.key64Re.test(%s))", s)("return%j", t(r, "integer|Long key"));
          break;
        case "bool":
          e("if(!util.key2Re.test(%s))", s)("return%j", t(r, "boolean key"))
      }
      return e
    }

    function a(e) {
      var a = r.codegen(["m"], e.name + "$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected"),
        n = {};
      e.oneofsArray.length && a("var p={}");
      for (var u = 0; u < e.fieldsArray.length; ++u) {
        var f = e._fieldsArray[u].resolve(),
          l = "m" + r.safeProp(f.name);
        if (f.optional && a("if(%s!=null&&m.hasOwnProperty(%j)){", l, f.name), f.map) a("if(!util.isObject(%s))", l)("return%j", t(f, "object"))("var k=Object.keys(%s)", l)("for(var i=0;i<k.length;++i){"), i(a, f, "k[i]"), s(a, f, u, l + "[k[i]]")("}");
        else if (f.repeated) a("if(!Array.isArray(%s))", l)("return%j", t(f, "array"))("for(var i=0;i<%s.length;++i){", l), s(a, f, u, l + "[i]")("}");
        else {
          if (f.partOf) {
            var o = r.safeProp(f.partOf.name);
            1 === n[f.partOf.name] && a("if(p%s===1)", o)("return%j", f.partOf.name + ": multiple values"), n[f.partOf.name] = 1, a("p%s=1", o)
          }
          s(a, f, u, l)
        }
        f.optional && a("}")
      }
      return a("return null")
    }
  }, {
    "./enum": "QVBM",
    "./util": "CVja"
  }],
  "Qtsa": [function (require, module, exports) {
    "use strict";
    var e = exports,
      s = require("./enum"),
      t = require("./util");

    function r(e, t, r, o) {
      if (t.resolvedType)
        if (t.resolvedType instanceof s) {
          e("switch(d%s){", o);
          for (var a = t.resolvedType.values, n = Object.keys(a), i = 0; i < n.length; ++i) t.repeated && a[n[i]] === t.typeDefault && e("default:"), e("case%j:", n[i])("case %i:", a[n[i]])("m%s=%j", o, a[n[i]])("break");
          e("}")
        } else e('if(typeof d%s!=="object")', o)("throw TypeError(%j)", t.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", o, r, o);
      else {
        var l = !1;
        switch (t.type) {
          case "double":
          case "float":
            e("m%s=Number(d%s)", o, o);
            break;
          case "uint32":
          case "fixed32":
            e("m%s=d%s>>>0", o, o);
            break;
          case "int32":
          case "sint32":
          case "sfixed32":
            e("m%s=d%s|0", o, o);
            break;
          case "uint64":
            l = !0;
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            e("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", o, o, l)('else if(typeof d%s==="string")', o)("m%s=parseInt(d%s,10)", o, o)('else if(typeof d%s==="number")', o)("m%s=d%s", o, o)('else if(typeof d%s==="object")', o)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", o, o, o, l ? "true" : "");
            break;
          case "bytes":
            e('if(typeof d%s==="string")', o)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", o, o, o)("else if(d%s.length)", o)("m%s=d%s", o, o);
            break;
          case "string":
            e("m%s=String(d%s)", o, o);
            break;
          case "bool":
            e("m%s=Boolean(d%s)", o, o)
        }
      }
      return e
    }

    function o(e, t, r, o) {
      if (t.resolvedType) t.resolvedType instanceof s ? e("d%s=o.enums===String?types[%i].values[m%s]:m%s", o, r, o, o) : e("d%s=types[%i].toObject(m%s,o)", o, r, o);
      else {
        var a = !1;
        switch (t.type) {
          case "double":
          case "float":
            e("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", o, o, o, o);
            break;
          case "uint64":
            a = !0;
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            e('if(typeof m%s==="number")', o)("d%s=o.longs===String?String(m%s):m%s", o, o, o)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", o, o, o, o, a ? "true" : "", o);
            break;
          case "bytes":
            e("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", o, o, o, o, o);
            break;
          default:
            e("d%s=m%s", o, o)
        }
      }
      return e
    }
    e.fromObject = function (e) {
      var o = e.fieldsArray,
        a = t.codegen(["d"], e.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
      if (!o.length) return a("return new this.ctor");
      a("var m=new this.ctor");
      for (var n = 0; n < o.length; ++n) {
        var i = o[n].resolve(),
          l = t.safeProp(i.name);
        i.map ? (a("if(d%s){", l)('if(typeof d%s!=="object")', l)("throw TypeError(%j)", i.fullName + ": object expected")("m%s={}", l)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", l), r(a, i, n, l + "[ks[i]]")("}")("}")) : i.repeated ? (a("if(d%s){", l)("if(!Array.isArray(d%s))", l)("throw TypeError(%j)", i.fullName + ": array expected")("m%s=[]", l)("for(var i=0;i<d%s.length;++i){", l), r(a, i, n, l + "[i]")("}")("}")) : (i.resolvedType instanceof s || a("if(d%s!=null){", l), r(a, i, n, l), i.resolvedType instanceof s || a("}"))
      }
      return a("return m")
    }, e.toObject = function (e) {
      var r = e.fieldsArray.slice().sort(t.compareFieldsById);
      if (!r.length) return t.codegen()("return {}");
      for (var a = t.codegen(["m", "o"], e.name + "$toObject")("if(!o)")("o={}")("var d={}"), n = [], i = [], l = [], f = 0; f < r.length; ++f) r[f].partOf || (r[f].resolve().repeated ? n : r[f].map ? i : l).push(r[f]);
      if (n.length) {
        for (a("if(o.arrays||o.defaults){"), f = 0; f < n.length; ++f) a("d%s=[]", t.safeProp(n[f].name));
        a("}")
      }
      if (i.length) {
        for (a("if(o.objects||o.defaults){"), f = 0; f < i.length; ++f) a("d%s={}", t.safeProp(i[f].name));
        a("}")
      }
      if (l.length) {
        for (a("if(o.defaults){"), f = 0; f < l.length; ++f) {
          var d = l[f],
            u = t.safeProp(d.name);
          if (d.resolvedType instanceof s) a("d%s=o.enums===String?%j:%j", u, d.resolvedType.valuesById[d.typeDefault], d.typeDefault);
          else if (d.long) a("if(util.Long){")("var n=new util.Long(%i,%i,%j)", d.typeDefault.low, d.typeDefault.high, d.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", u)("}else")("d%s=o.longs===String?%j:%i", u, d.typeDefault.toString(), d.typeDefault.toNumber());
          else if (d.bytes) {
            var m = "[" + Array.prototype.slice.call(d.typeDefault).join(",") + "]";
            a("if(o.bytes===String)d%s=%j", u, String.fromCharCode.apply(String, d.typeDefault))("else{")("d%s=%s", u, m)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", u, u)("}")
          } else a("d%s=%j", u, d.typeDefault)
        }
        a("}")
      }
      var c = !1;
      for (f = 0; f < r.length; ++f) {
        d = r[f];
        var p = e._fieldsArray.indexOf(d);
        u = t.safeProp(d.name);
        d.map ? (c || (c = !0, a("var ks2")), a("if(m%s&&(ks2=Object.keys(m%s)).length){", u, u)("d%s={}", u)("for(var j=0;j<ks2.length;++j){"), o(a, d, p, u + "[ks2[j]]")("}")) : d.repeated ? (a("if(m%s&&m%s.length){", u, u)("d%s=[]", u)("for(var j=0;j<m%s.length;++j){", u), o(a, d, p, u + "[j]")("}")) : (a("if(m%s!=null&&m.hasOwnProperty(%j)){", u, d.name), o(a, d, p, u), d.partOf && a("if(o.oneofs)")("d%s=%j", t.safeProp(d.partOf.name), d.name)), a("}")
      }
      return a("return d")
    };
  }, {
    "./enum": "QVBM",
    "./util": "CVja"
  }],
  "XU0z": [function (require, module, exports) {
    "use strict";
    var t = exports,
      e = require("./message");
    t[".google.protobuf.Any"] = {
      fromObject: function (t) {
        if (t && t["@type"]) {
          var e = this.lookup(t["@type"]);
          if (e) {
            var r = "." === t["@type"].charAt(0) ? t["@type"].substr(1) : t["@type"];
            return this.create({
              type_url: "/" + r,
              value: e.encode(e.fromObject(t)).finish()
            })
          }
        }
        return this.fromObject(t)
      },
      toObject: function (t, r) {
        if (r && r.json && t.type_url && t.value) {
          var o = t.type_url.substring(t.type_url.lastIndexOf("/") + 1),
            u = this.lookup(o);
          u && (t = u.decode(t.value))
        }
        if (!(t instanceof this.ctor) && t instanceof e) {
          var s = t.$type.toObject(t, r);
          return s["@type"] = t.$type.fullName, s
        }
        return this.toObject(t, r)
      }
    };
  }, {
    "./message": "DGUL"
  }],
  "/lgn": [function (require, module, exports) {
    "use strict";
    module.exports = y;
    var e = require("./namespace");
    ((y.prototype = Object.create(e.prototype)).constructor = y).className = "Type";
    var t = require("./enum"),
      r = require("./oneof"),
      i = require("./field"),
      o = require("./mapfield"),
      s = require("./service"),
      n = require("./message"),
      d = require("./reader"),
      f = require("./writer"),
      h = require("./util"),
      l = require("./encoder"),
      a = require("./decoder"),
      u = require("./verifier"),
      c = require("./converter"),
      p = require("./wrappers");

    function y(t, r) {
      e.call(this, t, r), this.fields = {}, this.oneofs = void 0, this.extensions = void 0, this.reserved = void 0, this.group = void 0, this._fieldsById = null, this._fieldsArray = null, this._oneofsArray = null, this._ctor = null
    }

    function v(e) {
      return e._fieldsById = e._fieldsArray = e._oneofsArray = null, delete e.encode, delete e.decode, delete e.verify, e
    }
    Object.defineProperties(y.prototype, {
      fieldsById: {
        get: function () {
          if (this._fieldsById) return this._fieldsById;
          this._fieldsById = {};
          for (var e = Object.keys(this.fields), t = 0; t < e.length; ++t) {
            var r = this.fields[e[t]],
              i = r.id;
            if (this._fieldsById[i]) throw Error("duplicate id " + i + " in " + this);
            this._fieldsById[i] = r
          }
          return this._fieldsById
        }
      },
      fieldsArray: {
        get: function () {
          return this._fieldsArray || (this._fieldsArray = h.toArray(this.fields))
        }
      },
      oneofsArray: {
        get: function () {
          return this._oneofsArray || (this._oneofsArray = h.toArray(this.oneofs))
        }
      },
      ctor: {
        get: function () {
          return this._ctor || (this.ctor = y.generateConstructor(this)())
        },
        set: function (e) {
          var t = e.prototype;
          t instanceof n || ((e.prototype = new n).constructor = e, h.merge(e.prototype, t)), e.$type = e.prototype.$type = this, h.merge(e, n, !0), this._ctor = e;
          for (var r = 0; r < this.fieldsArray.length; ++r) this._fieldsArray[r].resolve();
          var i = {};
          for (r = 0; r < this.oneofsArray.length; ++r) i[this._oneofsArray[r].resolve().name] = {
            get: h.oneOfGetter(this._oneofsArray[r].oneof),
            set: h.oneOfSetter(this._oneofsArray[r].oneof)
          };
          r && Object.defineProperties(e.prototype, i)
        }
      }
    }), y.generateConstructor = function (e) {
      for (var t, r = h.codegen(["p"], e.name), i = 0; i < e.fieldsArray.length; ++i)(t = e._fieldsArray[i]).map ? r("this%s={}", h.safeProp(t.name)) : t.repeated && r("this%s=[]", h.safeProp(t.name));
      return r("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]")
    }, y.fromJSON = function (n, d) {
      var f = new y(n, d.options);
      f.extensions = d.extensions, f.reserved = d.reserved;
      for (var h = Object.keys(d.fields), l = 0; l < h.length; ++l) f.add((void 0 !== d.fields[h[l]].keyType ? o.fromJSON : i.fromJSON)(h[l], d.fields[h[l]]));
      if (d.oneofs)
        for (h = Object.keys(d.oneofs), l = 0; l < h.length; ++l) f.add(r.fromJSON(h[l], d.oneofs[h[l]]));
      if (d.nested)
        for (h = Object.keys(d.nested), l = 0; l < h.length; ++l) {
          var a = d.nested[h[l]];
          f.add((void 0 !== a.id ? i.fromJSON : void 0 !== a.fields ? y.fromJSON : void 0 !== a.values ? t.fromJSON : void 0 !== a.methods ? s.fromJSON : e.fromJSON)(h[l], a))
        }
      return d.extensions && d.extensions.length && (f.extensions = d.extensions), d.reserved && d.reserved.length && (f.reserved = d.reserved), d.group && (f.group = !0), d.comment && (f.comment = d.comment), f
    }, y.prototype.toJSON = function (t) {
      var r = e.prototype.toJSON.call(this, t),
        i = !!t && Boolean(t.keepComments);
      return h.toObject(["options", r && r.options || void 0, "oneofs", e.arrayToJSON(this.oneofsArray, t), "fields", e.arrayToJSON(this.fieldsArray.filter(function (e) {
        return !e.declaringField
      }), t) || {}, "extensions", this.extensions && this.extensions.length ? this.extensions : void 0, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "group", this.group || void 0, "nested", r && r.nested || void 0, "comment", i ? this.comment : void 0])
    }, y.prototype.resolveAll = function () {
      for (var t = this.fieldsArray, r = 0; r < t.length;) t[r++].resolve();
      var i = this.oneofsArray;
      for (r = 0; r < i.length;) i[r++].resolve();
      return e.prototype.resolveAll.call(this)
    }, y.prototype.get = function (e) {
      return this.fields[e] || this.oneofs && this.oneofs[e] || this.nested && this.nested[e] || null
    }, y.prototype.add = function (t) {
      if (this.get(t.name)) throw Error("duplicate name '" + t.name + "' in " + this);
      if (t instanceof i && void 0 === t.extend) {
        if (this._fieldsById ? this._fieldsById[t.id] : this.fieldsById[t.id]) throw Error("duplicate id " + t.id + " in " + this);
        if (this.isReservedId(t.id)) throw Error("id " + t.id + " is reserved in " + this);
        if (this.isReservedName(t.name)) throw Error("name '" + t.name + "' is reserved in " + this);
        return t.parent && t.parent.remove(t), this.fields[t.name] = t, t.message = this, t.onAdd(this), v(this)
      }
      return t instanceof r ? (this.oneofs || (this.oneofs = {}), this.oneofs[t.name] = t, t.onAdd(this), v(this)) : e.prototype.add.call(this, t)
    }, y.prototype.remove = function (t) {
      if (t instanceof i && void 0 === t.extend) {
        if (!this.fields || this.fields[t.name] !== t) throw Error(t + " is not a member of " + this);
        return delete this.fields[t.name], t.parent = null, t.onRemove(this), v(this)
      }
      if (t instanceof r) {
        if (!this.oneofs || this.oneofs[t.name] !== t) throw Error(t + " is not a member of " + this);
        return delete this.oneofs[t.name], t.parent = null, t.onRemove(this), v(this)
      }
      return e.prototype.remove.call(this, t)
    }, y.prototype.isReservedId = function (t) {
      return e.isReservedId(this.reserved, t)
    }, y.prototype.isReservedName = function (t) {
      return e.isReservedName(this.reserved, t)
    }, y.prototype.create = function (e) {
      return new this.ctor(e)
    }, y.prototype.setup = function () {
      for (var e = this.fullName, t = [], r = 0; r < this.fieldsArray.length; ++r) t.push(this._fieldsArray[r].resolve().resolvedType);
      this.encode = l(this)({
        Writer: f,
        types: t,
        util: h
      }), this.decode = a(this)({
        Reader: d,
        types: t,
        util: h
      }), this.verify = u(this)({
        types: t,
        util: h
      }), this.fromObject = c.fromObject(this)({
        types: t,
        util: h
      }), this.toObject = c.toObject(this)({
        types: t,
        util: h
      });
      var i = p[e];
      if (i) {
        var o = Object.create(this);
        o.fromObject = this.fromObject, this.fromObject = i.fromObject.bind(o), o.toObject = this.toObject, this.toObject = i.toObject.bind(o)
      }
      return this
    }, y.prototype.encode = function (e, t) {
      return this.setup().encode(e, t)
    }, y.prototype.encodeDelimited = function (e, t) {
      return this.encode(e, t && t.len ? t.fork() : t).ldelim()
    }, y.prototype.decode = function (e, t) {
      return this.setup().decode(e, t)
    }, y.prototype.decodeDelimited = function (e) {
      return e instanceof d || (e = d.create(e)), this.decode(e, e.uint32())
    }, y.prototype.verify = function (e) {
      return this.setup().verify(e)
    }, y.prototype.fromObject = function (e) {
      return this.setup().fromObject(e)
    }, y.prototype.toObject = function (e, t) {
      return this.setup().toObject(e, t)
    }, y.d = function (e) {
      return function (t) {
        h.decorateType(t, e)
      }
    };
  }, {
    "./namespace": "Iv+k",
    "./enum": "QVBM",
    "./oneof": "tCFY",
    "./field": "+iVu",
    "./mapfield": "fBNh",
    "./service": "FvRI",
    "./message": "DGUL",
    "./reader": "nX4I",
    "./writer": "uteQ",
    "./util": "CVja",
    "./encoder": "bDtv",
    "./decoder": "8DjC",
    "./verifier": "y8ff",
    "./converter": "Qtsa",
    "./wrappers": "XU0z"
  }],
  "Jato": [function (require, module, exports) {
    var process = require("process");
    var e = require("process");
    module.exports = l;
    var t = require("./namespace");
    ((l.prototype = Object.create(t.prototype)).constructor = l).className = "Root";
    var n, r, i, o = require("./field"),
      s = require("./enum"),
      a = require("./oneof"),
      f = require("./util");

    function l(e) {
      t.call(this, "", e), this.deferred = [], this.files = []
    }

    function d() {}
    l.fromJSON = function (e, t) {
      return t || (t = new l), e.options && t.setOptions(e.options), t.addJSON(e.nested)
    }, l.prototype.resolvePath = f.path.resolve, l.prototype.load = function e(t, n, o) {
      "function" == typeof n && (o = n, n = void 0);
      var s = this;
      if (!o) return f.asPromise(e, s, t, n);
      var a = o === d;

      function l(e, t) {
        if (o) {
          var n = o;
          if (o = null, a) throw e;
          n(e, t)
        }
      }

      function u(e, t) {
        try {
          if (f.isString(t) && "{" === t.charAt(0) && (t = JSON.parse(t)), f.isString(t)) {
            r.filename = e;
            var i, o = r(t, s, n),
              d = 0;
            if (o.imports)
              for (; d < o.imports.length; ++d)(i = s.resolvePath(e, o.imports[d])) && p(i);
            if (o.weakImports)
              for (d = 0; d < o.weakImports.length; ++d)(i = s.resolvePath(e, o.weakImports[d])) && p(i, !0)
          } else s.setOptions(t.options).addJSON(t.nested)
        } catch (u) {
          l(u)
        }
        a || c || l(null, s)
      }

      function p(e, t) {
        var n = e.lastIndexOf("google/protobuf/");
        if (n > -1) {
          var r = e.substring(n);
          r in i && (e = r)
        }
        if (!(s.files.indexOf(e) > -1))
          if (s.files.push(e), e in i) a ? u(e, i[e]) : (++c, setTimeout(function () {
            --c, u(e, i[e])
          }));
          else if (a) {
          var d;
          try {
            d = f.fs.readFileSync(e).toString("utf8")
          } catch (p) {
            return void(t || l(p))
          }
          u(e, d)
        } else ++c, f.fetch(e, function (n, r) {
          --c, o && (n ? t ? c || l(null, s) : l(n) : u(e, r))
        })
      }
      var c = 0;
      f.isString(t) && (t = [t]);
      for (var h, v = 0; v < t.length; ++v)(h = s.resolvePath("", t[v])) && p(h);
      if (a) return s;
      c || l(null, s)
    }, l.prototype.loadSync = function (e, t) {
      if (!f.isNode) throw Error("not supported");
      return this.load(e, t, d)
    }, l.prototype.resolveAll = function () {
      if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map(function (e) {
        return "'extend " + e.extend + "' in " + e.parent.fullName
      }).join(", "));
      return t.prototype.resolveAll.call(this)
    };
    var u = /^[A-Z]/;

    function p(e, t) {
      var n = t.parent.lookup(t.extend);
      if (n) {
        var r = new o(t.fullName, t.id, t.type, t.rule, void 0, t.options);
        return r.declaringField = t, t.extensionField = r, n.add(r), !0
      }
      return !1
    }
    l.prototype._handleAdd = function (e) {
      if (e instanceof o) void 0 === e.extend || e.extensionField || p(this, e) || this.deferred.push(e);
      else if (e instanceof s) u.test(e.name) && (e.parent[e.name] = e.values);
      else if (!(e instanceof a)) {
        if (e instanceof n)
          for (var t = 0; t < this.deferred.length;) p(this, this.deferred[t]) ? this.deferred.splice(t, 1) : ++t;
        for (var r = 0; r < e.nestedArray.length; ++r) this._handleAdd(e._nestedArray[r]);
        u.test(e.name) && (e.parent[e.name] = e)
      }
    }, l.prototype._handleRemove = function (e) {
      if (e instanceof o) {
        if (void 0 !== e.extend)
          if (e.extensionField) e.extensionField.parent.remove(e.extensionField), e.extensionField = null;
          else {
            var n = this.deferred.indexOf(e);
            n > -1 && this.deferred.splice(n, 1)
          }
      } else if (e instanceof s) u.test(e.name) && delete e.parent[e.name];
      else if (e instanceof t) {
        for (var r = 0; r < e.nestedArray.length; ++r) this._handleRemove(e._nestedArray[r]);
        u.test(e.name) && delete e.parent[e.name]
      }
    }, l._configure = function (e, t, o) {
      n = e, r = t, i = o
    };
  }, {
    "./namespace": "Iv+k",
    "./field": "+iVu",
    "./enum": "QVBM",
    "./oneof": "tCFY",
    "./util": "CVja",
    "process": "g5I+"
  }],
  "CVja": [function (require, module, exports) {
    "use strict";
    var e, t, r = module.exports = require("./util/minimal"),
      n = require("./roots");
    r.codegen = require("@protobufjs/codegen"), r.fetch = require("@protobufjs/fetch"), r.path = require("@protobufjs/path"), r.fs = r.inquire("fs"), r.toArray = function (e) {
      if (e) {
        for (var t = Object.keys(e), r = new Array(t.length), n = 0; n < t.length;) r[n] = e[t[n++]];
        return r
      }
      return []
    }, r.toObject = function (e) {
      for (var t = {}, r = 0; r < e.length;) {
        var n = e[r++],
          o = e[r++];
        void 0 !== o && (t[n] = o)
      }
      return t
    };
    var o = /\\/g,
      u = /"/g;
    r.isReserved = function (e) {
      return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(e)
    }, r.safeProp = function (e) {
      return !/^[$\w_]+$/.test(e) || r.isReserved(e) ? '["' + e.replace(o, "\\\\").replace(u, '\\"') + '"]' : "." + e
    }, r.ucFirst = function (e) {
      return e.charAt(0).toUpperCase() + e.substring(1)
    };
    var a = /_([a-z])/g;
    r.camelCase = function (e) {
      return e.substring(0, 1) + e.substring(1).replace(a, function (e, t) {
        return t.toUpperCase()
      })
    }, r.compareFieldsById = function (e, t) {
      return e.id - t.id
    }, r.decorateType = function (t, n) {
      if (t.$type) return n && t.$type.name !== n && (r.decorateRoot.remove(t.$type), t.$type.name = n, r.decorateRoot.add(t.$type)), t.$type;
      e || (e = require("./type"));
      var o = new e(n || t.name);
      return r.decorateRoot.add(o), o.ctor = t, Object.defineProperty(t, "$type", {
        value: o,
        enumerable: !1
      }), Object.defineProperty(t.prototype, "$type", {
        value: o,
        enumerable: !1
      }), o
    };
    var i = 0;
    r.decorateEnum = function (e) {
      if (e.$type) return e.$type;
      t || (t = require("./enum"));
      var n = new t("Enum" + i++, e);
      return r.decorateRoot.add(n), Object.defineProperty(e, "$type", {
        value: n,
        enumerable: !1
      }), n
    }, Object.defineProperty(r, "decorateRoot", {
      get: function () {
        return n.decorated || (n.decorated = new(require("./root")))
      }
    });
  }, {
    "./util/minimal": "+OqZ",
    "./roots": "S/PD",
    "@protobufjs/codegen": "YmP9",
    "@protobufjs/fetch": "h5wE",
    "@protobufjs/path": "Mao7",
    "./type": "/lgn",
    "./enum": "QVBM",
    "./root": "Jato"
  }],
  "lIB1": [function (require, module, exports) {
    "use strict";
    module.exports = e, e.className = "ReflectionObject";
    var t, o = require("./util");

    function e(t, e) {
      if (!o.isString(t)) throw TypeError("name must be a string");
      if (e && !o.isObject(e)) throw TypeError("options must be an object");
      this.options = e, this.name = t, this.parent = null, this.resolved = !1, this.comment = null, this.filename = null
    }
    Object.defineProperties(e.prototype, {
      root: {
        get: function () {
          for (var t = this; null !== t.parent;) t = t.parent;
          return t
        }
      },
      fullName: {
        get: function () {
          for (var t = [this.name], o = this.parent; o;) t.unshift(o.name), o = o.parent;
          return t.join(".")
        }
      }
    }), e.prototype.toJSON = function () {
      throw Error()
    }, e.prototype.onAdd = function (o) {
      this.parent && this.parent !== o && this.parent.remove(this), this.parent = o, this.resolved = !1;
      var e = o.root;
      e instanceof t && e._handleAdd(this)
    }, e.prototype.onRemove = function (o) {
      var e = o.root;
      e instanceof t && e._handleRemove(this), this.parent = null, this.resolved = !1
    }, e.prototype.resolve = function () {
      return this.resolved ? this : (this.root instanceof t && (this.resolved = !0), this)
    }, e.prototype.getOption = function (t) {
      if (this.options) return this.options[t]
    }, e.prototype.setOption = function (t, o, e) {
      return e && this.options && void 0 !== this.options[t] || ((this.options || (this.options = {}))[t] = o), this
    }, e.prototype.setOptions = function (t, o) {
      if (t)
        for (var e = Object.keys(t), n = 0; n < e.length; ++n) this.setOption(e[n], t[e[n]], o);
      return this
    }, e.prototype.toString = function () {
      var t = this.constructor.className,
        o = this.fullName;
      return o.length ? t + " " + o : t
    }, e._configure = function (o) {
      t = o
    };
  }, {
    "./util": "CVja"
  }],
  "QVBM": [function (require, module, exports) {
    "use strict";
    module.exports = r;
    var e = require("./object");
    ((r.prototype = Object.create(e.prototype)).constructor = r).className = "Enum";
    var t = require("./namespace"),
      s = require("./util");

    function r(t, s, r, i, o) {
      if (e.call(this, t, r), s && "object" != typeof s) throw TypeError("values must be an object");
      if (this.valuesById = {}, this.values = Object.create(this.valuesById), this.comment = i, this.comments = o || {}, this.reserved = void 0, s)
        for (var n = Object.keys(s), h = 0; h < n.length; ++h) "number" == typeof s[n[h]] && (this.valuesById[this.values[n[h]] = s[n[h]]] = n[h])
    }
    r.fromJSON = function (e, t) {
      var s = new r(e, t.values, t.options, t.comment, t.comments);
      return s.reserved = t.reserved, s
    }, r.prototype.toJSON = function (e) {
      var t = !!e && Boolean(e.keepComments);
      return s.toObject(["options", this.options, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "comment", t ? this.comment : void 0, "comments", t ? this.comments : void 0])
    }, r.prototype.add = function (e, t, r) {
      if (!s.isString(e)) throw TypeError("name must be a string");
      if (!s.isInteger(t)) throw TypeError("id must be an integer");
      if (void 0 !== this.values[e]) throw Error("duplicate name '" + e + "' in " + this);
      if (this.isReservedId(t)) throw Error("id " + t + " is reserved in " + this);
      if (this.isReservedName(e)) throw Error("name '" + e + "' is reserved in " + this);
      if (void 0 !== this.valuesById[t]) {
        if (!this.options || !this.options.allow_alias) throw Error("duplicate id " + t + " in " + this);
        this.values[e] = t
      } else this.valuesById[this.values[e] = t] = e;
      return this.comments[e] = r || null, this
    }, r.prototype.remove = function (e) {
      if (!s.isString(e)) throw TypeError("name must be a string");
      var t = this.values[e];
      if (null == t) throw Error("name '" + e + "' does not exist in " + this);
      return delete this.valuesById[t], delete this.values[e], delete this.comments[e], this
    }, r.prototype.isReservedId = function (e) {
      return t.isReservedId(this.reserved, e)
    }, r.prototype.isReservedName = function (e) {
      return t.isReservedName(this.reserved, e)
    };
  }, {
    "./object": "lIB1",
    "./namespace": "Iv+k",
    "./util": "CVja"
  }],
  "bDtv": [function (require, module, exports) {
    "use strict";
    module.exports = n;
    var e = require("./enum"),
      i = require("./types"),
      r = require("./util");

    function s(e, i, r, s) {
      return i.resolvedType.group ? e("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", r, s, (i.id << 3 | 3) >>> 0, (i.id << 3 | 4) >>> 0) : e("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", r, s, (i.id << 3 | 2) >>> 0)
    }

    function n(n) {
      for (var t, o = r.codegen(["m", "w"], n.name + "$encode")("if(!w)")("w=Writer.create()"), d = n.fieldsArray.slice().sort(r.compareFieldsById), l = 0; l < d.length; ++l) {
        var u = d[l].resolve(),
          a = n._fieldsArray.indexOf(u),
          p = u.resolvedType instanceof e ? "int32" : u.type,
          f = i.basic[p];
        t = "m" + r.safeProp(u.name), u.map ? (o("if(%s!=null&&m.hasOwnProperty(%j)){", t, u.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", t)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (u.id << 3 | 2) >>> 0, 8 | i.mapKey[u.keyType], u.keyType), void 0 === f ? o("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", a, t) : o(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | f, p, t), o("}")("}")) : u.repeated ? (o("if(%s!=null&&%s.length){", t, t), u.packed && void 0 !== i.packed[p] ? o("w.uint32(%i).fork()", (u.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", t)("w.%s(%s[i])", p, t)("w.ldelim()") : (o("for(var i=0;i<%s.length;++i)", t), void 0 === f ? s(o, u, a, t + "[i]") : o("w.uint32(%i).%s(%s[i])", (u.id << 3 | f) >>> 0, p, t)), o("}")) : (u.optional && o("if(%s!=null&&m.hasOwnProperty(%j))", t, u.name), void 0 === f ? s(o, u, a, t) : o("w.uint32(%i).%s(%s)", (u.id << 3 | f) >>> 0, p, t))
      }
      return o("return w")
    }
  }, {
    "./enum": "QVBM",
    "./types": "eiCH",
    "./util": "CVja"
  }],
  "wgyk": [function (require, module, exports) {
    "use strict";
    var e = module.exports = require("./index-minimal");

    function r(r, i, o) {
      return "function" == typeof i ? (o = i, i = new e.Root) : i || (i = new e.Root), i.load(r, o)
    }

    function i(r, i) {
      return i || (i = new e.Root), i.loadSync(r)
    }
    e.build = "light", e.load = r, e.loadSync = i, e.encoder = require("./encoder"), e.decoder = require("./decoder"), e.verifier = require("./verifier"), e.converter = require("./converter"), e.ReflectionObject = require("./object"), e.Namespace = require("./namespace"), e.Root = require("./root"), e.Enum = require("./enum"), e.Type = require("./type"), e.Field = require("./field"), e.OneOf = require("./oneof"), e.MapField = require("./mapfield"), e.Service = require("./service"), e.Method = require("./method"), e.Message = require("./message"), e.wrappers = require("./wrappers"), e.types = require("./types"), e.util = require("./util"), e.ReflectionObject._configure(e.Root), e.Namespace._configure(e.Type, e.Service, e.Enum), e.Root._configure(e.Type), e.Field._configure(e.Type);
  }, {
    "./index-minimal": "6BiI",
    "./encoder": "bDtv",
    "./decoder": "8DjC",
    "./verifier": "y8ff",
    "./converter": "Qtsa",
    "./object": "lIB1",
    "./namespace": "Iv+k",
    "./root": "Jato",
    "./enum": "QVBM",
    "./type": "/lgn",
    "./field": "+iVu",
    "./oneof": "tCFY",
    "./mapfield": "fBNh",
    "./service": "FvRI",
    "./method": "7LdZ",
    "./message": "DGUL",
    "./wrappers": "XU0z",
    "./types": "eiCH",
    "./util": "CVja"
  }],
  "BwgP": [function (require, module, exports) {
    "use strict";
    module.exports = c;
    var n = /[\s{}=;:[\],'"()<>]/g,
      r = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
      t = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
      e = /^ *[*\/]+ */,
      i = /^\s*\*?\/*/,
      u = /\n/g,
      l = /\s/,
      f = /\\(.?)/g,
      o = {
        0: "\0",
        r: "\r",
        n: "\n",
        t: "\t"
      };

    function s(n) {
      return n.replace(f, function (n, r) {
        switch (r) {
          case "\\":
          case "":
            return r;
          default:
            return o[r] || ""
        }
      })
    }

    function c(f, o) {
      f = f.toString();
      var c = 0,
        a = f.length,
        h = 1,
        g = null,
        v = null,
        d = 0,
        p = !1,
        m = [],
        w = null;

      function x(n) {
        return Error("illegal " + n + " (line " + h + ")")
      }

      function b(n) {
        return f.charAt(n)
      }

      function k(n, r) {
        g = f.charAt(n++), d = h, p = !1;
        var t, l = n - (o ? 2 : 3);
        do {
          if (--l < 0 || "\n" === (t = f.charAt(l))) {
            p = !0;
            break
          }
        } while (" " === t || "\t" === t);
        for (var s = f.substring(n, r).split(u), c = 0; c < s.length; ++c) s[c] = s[c].replace(o ? i : e, "").trim();
        v = s.join("\n").trim()
      }

      function A(n) {
        var r = I(n),
          t = f.substring(n, r);
        return /^\s*\/{1,2}/.test(t)
      }

      function I(n) {
        for (var r = n; r < a && "\n" !== b(r);) r++;
        return r
      }

      function j() {
        if (m.length > 0) return m.shift();
        if (w) return function () {
          var n = "'" === w ? t : r;
          n.lastIndex = c - 1;
          var e = n.exec(f);
          if (!e) throw x("string");
          return c = n.lastIndex, y(w), w = null, s(e[1])
        }();
        var e, i, u, g, v;
        do {
          if (c === a) return null;
          for (e = !1; l.test(u = b(c));)
            if ("\n" === u && ++h, ++c === a) return null;
          if ("/" === b(c)) {
            if (++c === a) throw x("comment");
            if ("/" === b(c))
              if (o) {
                if (g = c, v = !1, A(c)) {
                  v = !0;
                  do {
                    if ((c = I(c)) === a) break;
                    c++
                  } while (A(c))
                } else c = Math.min(a, I(c) + 1);
                v && k(g, c), h++, e = !0
              } else {
                for (v = "/" === b(g = c + 1);
                  "\n" !== b(++c);)
                  if (c === a) return null;
                ++c, v && k(g, c - 1), ++h, e = !0
              }
            else {
              if ("*" !== (u = b(c))) return "/";
              g = c + 1, v = o || "*" === b(g);
              do {
                if ("\n" === u && ++h, ++c === a) throw x("comment");
                i = u, u = b(c)
              } while ("*" !== i || "/" !== u);
              ++c, v && k(g, c - 2), e = !0
            }
          }
        } while (e);
        var d = c;
        if (n.lastIndex = 0, !n.test(b(d++)))
          for (; d < a && !n.test(b(d));) ++d;
        var p = f.substring(c, c = d);
        return '"' !== p && "'" !== p || (w = p), p
      }

      function y(n) {
        m.push(n)
      }

      function E() {
        if (!m.length) {
          var n = j();
          if (null === n) return null;
          y(n)
        }
        return m[0]
      }
      return Object.defineProperty({
        next: j,
        peek: E,
        push: y,
        skip: function (n, r) {
          var t = E();
          if (t === n) return j(), !0;
          if (!r) throw x("token '" + t + "', '" + n + "' expected");
          return !1
        },
        cmnt: function (n) {
          var r = null;
          return void 0 === n ? d === h - 1 && (o || "*" === g || p) && (r = v) : (d < n && E(), d !== n || p || !o && "/" !== g || (r = v)), r
        }
      }, "line", {
        get: function () {
          return h
        }
      })
    }
    c.unescape = s;
  }, {}],
  "9lF6": [function (require, module, exports) {
    "use strict";
    module.exports = q, q.filename = null, q.defaults = {
      keepCase: !1
    };
    var e = require("./tokenize"),
      t = require("./root"),
      r = require("./type"),
      n = require("./field"),
      a = require("./mapfield"),
      i = require("./oneof"),
      o = require("./enum"),
      s = require("./service"),
      c = require("./method"),
      f = require("./types"),
      u = require("./util"),
      p = /^[1-9][0-9]*$/,
      w = /^-?[1-9][0-9]*$/,
      h = /^0[x][0-9a-fA-F]+$/,
      d = /^-?0[x][0-9a-fA-F]+$/,
      l = /^0[0-7]+$/,
      m = /^-?0[0-7]+$/,
      v = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
      k = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
      b = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
      A = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;

    function q(x, y, $) {
      y instanceof t || ($ = y, y = new t), $ || ($ = q.defaults);
      var g, z, I, N, Z, _ = e(x, $.alternateCommentMode || !1),
        F = _.next,
        E = _.push,
        C = _.peek,
        M = _.skip,
        O = _.cmnt,
        j = !0,
        K = !1,
        L = y,
        R = $.keepCase ? function (e) {
          return e
        } : u.camelCase;

      function S(e, t, r) {
        var n = q.filename;
        return r || (q.filename = null), Error("illegal " + (t || "token") + " '" + e + "' (" + (n ? n + ", " : "") + "line " + _.line + ")")
      }

      function T() {
        var e, t = [];
        do {
          if ('"' !== (e = F()) && "'" !== e) throw S(e);
          t.push(F()), M(e), e = C()
        } while ('"' === e || "'" === e);
        return t.join("")
      }

      function U(e) {
        var t = F();
        switch (t) {
          case "'":
          case '"':
            return E(t), T();
          case "true":
          case "TRUE":
            return !0;
          case "false":
          case "FALSE":
            return !1
        }
        try {
          return function (e, t) {
            var r = 1;
            "-" === e.charAt(0) && (r = -1, e = e.substring(1));
            switch (e) {
              case "inf":
              case "INF":
              case "Inf":
                return r * (1 / 0);
              case "nan":
              case "NAN":
              case "Nan":
              case "NaN":
                return NaN;
              case "0":
                return 0
            }
            if (p.test(e)) return r * parseInt(e, 10);
            if (h.test(e)) return r * parseInt(e, 16);
            if (l.test(e)) return r * parseInt(e, 8);
            if (v.test(e)) return r * parseFloat(e);
            throw S(e, "number", t)
          }(t, !0)
        } catch (r) {
          if (e && b.test(t)) return t;
          throw S(t, "value")
        }
      }

      function X(e, t) {
        var r, n;
        do {
          !t || '"' !== (r = C()) && "'" !== r ? e.push([n = B(F()), M("to", !0) ? B(F()) : n]) : e.push(T())
        } while (M(",", !0));
        M(";")
      }

      function B(e, t) {
        switch (e) {
          case "max":
          case "MAX":
          case "Max":
            return 536870911;
          case "0":
            return 0
        }
        if (!t && "-" === e.charAt(0)) throw S(e, "id");
        if (w.test(e)) return parseInt(e, 10);
        if (d.test(e)) return parseInt(e, 16);
        if (m.test(e)) return parseInt(e, 8);
        throw S(e, "id")
      }

      function D() {
        if (void 0 !== g) throw S("package");
        if (g = F(), !b.test(g)) throw S(g, "name");
        L = L.define(g), M(";")
      }

      function G() {
        var e, t = C();
        switch (t) {
          case "weak":
            e = I || (I = []), F();
            break;
          case "public":
            F();
          default:
            e = z || (z = [])
        }
        t = T(), M(";"), e.push(t)
      }

      function H() {
        if (M("="), N = T(), !(K = "proto3" === N) && "proto2" !== N) throw S(N, "syntax");
        M(";")
      }

      function J(e, t) {
        switch (t) {
          case "option":
            return V(e, t), M(";"), !0;
          case "message":
            return function (e, t) {
              if (!k.test(t = F())) throw S(t, "type name");
              var n = new r(t);
              P(n, function (e) {
                if (!J(n, e)) switch (e) {
                  case "map":
                    ! function (e) {
                      M("<");
                      var t = F();
                      if (void 0 === f.mapKey[t]) throw S(t, "type");
                      M(",");
                      var r = F();
                      if (!b.test(r)) throw S(r, "type");
                      M(">");
                      var n = F();
                      if (!k.test(n)) throw S(n, "name");
                      M("=");
                      var i = new a(R(n), B(F()), t, r);
                      P(i, function (e) {
                        if ("option" !== e) throw S(e);
                        V(i, e), M(";")
                      }, function () {
                        ee(i)
                      }), e.add(i)
                    }(n);
                    break;
                  case "required":
                  case "optional":
                  case "repeated":
                    Q(n, e);
                    break;
                  case "oneof":
                    ! function (e, t) {
                      if (!k.test(t = F())) throw S(t, "name");
                      var r = new i(R(t));
                      P(r, function (e) {
                        "option" === e ? (V(r, e), M(";")) : (E(e), Q(r, "optional"))
                      }), e.add(r)
                    }(n, e);
                    break;
                  case "extensions":
                    X(n.extensions || (n.extensions = []));
                    break;
                  case "reserved":
                    X(n.reserved || (n.reserved = []), !0);
                    break;
                  default:
                    if (!K || !b.test(e)) throw S(e);
                    E(e), Q(n, "optional")
                }
              }), e.add(n)
            }(e, t), !0;
          case "enum":
            return function (e, t) {
              if (!k.test(t = F())) throw S(t, "name");
              var r = new o(t);
              P(r, function (e) {
                switch (e) {
                  case "option":
                    V(r, e), M(";");
                    break;
                  case "reserved":
                    X(r.reserved || (r.reserved = []), !0);
                    break;
                  default:
                    ! function (e, t) {
                      if (!k.test(t)) throw S(t, "name");
                      M("=");
                      var r = B(F(), !0),
                        n = {};
                      P(n, function (e) {
                        if ("option" !== e) throw S(e);
                        V(n, e), M(";")
                      }, function () {
                        ee(n)
                      }), e.add(t, r, n.comment)
                    }(r, e)
                }
              }), e.add(r)
            }(e, t), !0;
          case "service":
            return function (e, t) {
              if (!k.test(t = F())) throw S(t, "service name");
              var r = new s(t);
              P(r, function (e) {
                if (!J(r, e)) {
                  if ("rpc" !== e) throw S(e);
                  ! function (e, t) {
                    var r = t;
                    if (!k.test(t = F())) throw S(t, "name");
                    var n, a, i, o, s = t;
                    M("("), M("stream", !0) && (a = !0);
                    if (!b.test(t = F())) throw S(t);
                    n = t, M(")"), M("returns"), M("("), M("stream", !0) && (o = !0);
                    if (!b.test(t = F())) throw S(t);
                    i = t, M(")");
                    var f = new c(s, r, n, i, a, o);
                    P(f, function (e) {
                      if ("option" !== e) throw S(e);
                      V(f, e), M(";")
                    }), e.add(f)
                  }(r, e)
                }
              }), e.add(r)
            }(e, t), !0;
          case "extend":
            return function (e, t) {
              if (!b.test(t = F())) throw S(t, "reference");
              var r = t;
              P(null, function (t) {
                switch (t) {
                  case "required":
                  case "repeated":
                  case "optional":
                    Q(e, t, r);
                    break;
                  default:
                    if (!K || !b.test(t)) throw S(t);
                    E(t), Q(e, "optional", r)
                }
              })
            }(e, t), !0
        }
        return !1
      }

      function P(e, t, r) {
        var n = _.line;
        if (e && (e.comment = O(), e.filename = q.filename), M("{", !0)) {
          for (var a;
            "}" !== (a = F());) t(a);
          M(";", !0)
        } else r && r(), M(";"), e && "string" != typeof e.comment && (e.comment = O(n))
      }

      function Q(e, t, a) {
        var i = F();
        if ("group" !== i) {
          if (!b.test(i)) throw S(i, "type");
          var o = F();
          if (!k.test(o)) throw S(o, "name");
          o = R(o), M("=");
          var s = new n(o, B(F()), i, t, a);
          P(s, function (e) {
            if ("option" !== e) throw S(e);
            V(s, e), M(";")
          }, function () {
            ee(s)
          }), e.add(s), K || !s.repeated || void 0 === f.packed[i] && void 0 !== f.basic[i] || s.setOption("packed", !1, !0)
        } else ! function (e, t) {
          var a = F();
          if (!k.test(a)) throw S(a, "name");
          var i = u.lcFirst(a);
          a === i && (a = u.ucFirst(a));
          M("=");
          var o = B(F()),
            s = new r(a);
          s.group = !0;
          var c = new n(i, o, a, t);
          c.filename = q.filename, P(s, function (e) {
            switch (e) {
              case "option":
                V(s, e), M(";");
                break;
              case "required":
              case "optional":
              case "repeated":
                Q(s, e);
                break;
              default:
                throw S(e)
            }
          }), e.add(s).add(c)
        }(e, t)
      }

      function V(e, t) {
        var r = M("(", !0);
        if (!b.test(t = F())) throw S(t, "name");
        var n = t;
        r && (M(")"), n = "(" + n + ")", t = C(), A.test(t) && (n += t, F())), M("="), W(e, n)
      }

      function W(e, t) {
        if (M("{", !0))
          do {
            if (!k.test(Z = F())) throw S(Z, "name");
            "{" === C() ? W(e, t + "." + Z) : (M(":"), "{" === C() ? W(e, t + "." + Z) : Y(e, t + "." + Z, U(!0))), M(",", !0)
          } while (!M("}", !0));
        else Y(e, t, U(!0))
      }

      function Y(e, t, r) {
        e.setOption && e.setOption(t, r)
      }

      function ee(e) {
        if (M("[", !0)) {
          do {
            V(e, "option")
          } while (M(",", !0));
          M("]")
        }
        return e
      }
      for (; null !== (Z = F());) switch (Z) {
        case "package":
          if (!j) throw S(Z);
          D();
          break;
        case "import":
          if (!j) throw S(Z);
          G();
          break;
        case "syntax":
          if (!j) throw S(Z);
          H();
          break;
        case "option":
          if (!j) throw S(Z);
          V(L, Z), M(";");
          break;
        default:
          if (J(L, Z)) {
            j = !1;
            continue
          }
          throw S(Z)
      }
      return q.filename = null, {
        package: g,
        imports: z,
        weakImports: I,
        syntax: N,
        root: y
      }
    }
  }, {
    "./tokenize": "BwgP",
    "./root": "Jato",
    "./type": "/lgn",
    "./field": "+iVu",
    "./mapfield": "fBNh",
    "./oneof": "tCFY",
    "./enum": "QVBM",
    "./service": "FvRI",
    "./method": "7LdZ",
    "./types": "eiCH",
    "./util": "CVja"
  }],
  "A41Z": [function (require, module, exports) {
    "use strict";
    module.exports = t;
    var e, l = /\/|\./;

    function t(e, u) {
      l.test(e) || (e = "google/protobuf/" + e + ".proto", u = {
        nested: {
          google: {
            nested: {
              protobuf: {
                nested: u
              }
            }
          }
        }
      }), t[e] = u
    }
    t("any", {
      Any: {
        fields: {
          type_url: {
            type: "string",
            id: 1
          },
          value: {
            type: "bytes",
            id: 2
          }
        }
      }
    }), t("duration", {
      Duration: e = {
        fields: {
          seconds: {
            type: "int64",
            id: 1
          },
          nanos: {
            type: "int32",
            id: 2
          }
        }
      }
    }), t("timestamp", {
      Timestamp: e
    }), t("empty", {
      Empty: {
        fields: {}
      }
    }), t("struct", {
      Struct: {
        fields: {
          fields: {
            keyType: "string",
            type: "Value",
            id: 1
          }
        }
      },
      Value: {
        oneofs: {
          kind: {
            oneof: ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]
          }
        },
        fields: {
          nullValue: {
            type: "NullValue",
            id: 1
          },
          numberValue: {
            type: "double",
            id: 2
          },
          stringValue: {
            type: "string",
            id: 3
          },
          boolValue: {
            type: "bool",
            id: 4
          },
          structValue: {
            type: "Struct",
            id: 5
          },
          listValue: {
            type: "ListValue",
            id: 6
          }
        }
      },
      NullValue: {
        values: {
          NULL_VALUE: 0
        }
      },
      ListValue: {
        fields: {
          values: {
            rule: "repeated",
            type: "Value",
            id: 1
          }
        }
      }
    }), t("wrappers", {
      DoubleValue: {
        fields: {
          value: {
            type: "double",
            id: 1
          }
        }
      },
      FloatValue: {
        fields: {
          value: {
            type: "float",
            id: 1
          }
        }
      },
      Int64Value: {
        fields: {
          value: {
            type: "int64",
            id: 1
          }
        }
      },
      UInt64Value: {
        fields: {
          value: {
            type: "uint64",
            id: 1
          }
        }
      },
      Int32Value: {
        fields: {
          value: {
            type: "int32",
            id: 1
          }
        }
      },
      UInt32Value: {
        fields: {
          value: {
            type: "uint32",
            id: 1
          }
        }
      },
      BoolValue: {
        fields: {
          value: {
            type: "bool",
            id: 1
          }
        }
      },
      StringValue: {
        fields: {
          value: {
            type: "string",
            id: 1
          }
        }
      },
      BytesValue: {
        fields: {
          value: {
            type: "bytes",
            id: 1
          }
        }
      }
    }), t("field_mask", {
      FieldMask: {
        fields: {
          paths: {
            rule: "repeated",
            type: "string",
            id: 1
          }
        }
      }
    }), t.get = function (e) {
      return t[e] || null
    };
  }, {}],
  "Xb+b": [function (require, module, exports) {
    "use strict";
    var e = module.exports = require("./index-light");
    e.build = "full", e.tokenize = require("./tokenize"), e.parse = require("./parse"), e.common = require("./common"), e.Root._configure(e.Type, e.parse, e.common);
  }, {
    "./index-light": "wgyk",
    "./tokenize": "BwgP",
    "./parse": "9lF6",
    "./common": "A41Z"
  }],
  "fN30": [function (require, module, exports) {
    "use strict";
    module.exports = require("./src/index");
  }, {
    "./src/index": "Xb+b"
  }],
  "h12o": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = h(require("./allnode")),
      t = h(require("./status")),
      o = h(require("./message")),
      s = h(require("./queue")),
      n = h(require("./chat/sendChatMessage")),
      r = h(require("./chat/handleChatMessage")),
      i = h(require("./muc/HandleMucMessage")),
      a = h(require("./roster/HandleRosterMessage")),
      c = h(require("./statistics/HandleStatisticsMessage")),
      u = h(require("long")),
      p = h(require("./restApis")),
      d = h(require("./weichatPb/protobuf")),
      l = h(require("./checkEnv"));

    function h(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    var f = "3.1.2",
      m = {};
    try {
      window.WebIM = m
    } catch (V) {
      wx.WebIM = m
    }
    var y, g = (0, e.default)(),
      N = (0, t.default)(),
      v = {},
      I = {},
      E = 100,
      T = [],
      O = [];
    if (!l.default) {
      var _ = require("sockjs-client"),
        C = require("Base64"),
        S = require("protobufjs"),
        M = require("./utils").default;
      S.util.Long = u.default, S.configure();
      var R = S.Root.fromJSON(g)
    }
    if (l.default) {
      var b = d.default;
      M = require("./wx/utils").default;
      try {
        window = wx || {}, _ = {
          CLOSED: 3,
          CLOSING: 2,
          CONNECTING: 0,
          OPEN: 1
        }
      } catch (V) {
        console.log("the environment is in browser")
      }
      R = b.Root.fromJSON(g)
    }
    var x = function (e, t) {
        window.addEventListener ? (window.addEventListener("online", e), window.addEventListener("offline", t)) : window.attachEvent && (document.body ? (document.body.attachEvent("ononline", e), document.body.attachEvent("onoffline", t)) : window.attachEvent("load", function () {
          document.body.attachEvent("ononline", e), document.body.attachEvent("onoffline", t)
        }))
      },
      k = function (e) {
        if (l.default) try {
          return wx.connectSocket({
            url: e.url,
            header: {
              "content-type": "application/json"
            },
            success: function (t) {
              !e.logOut && e.heartBeat(e)
            },
            fail: function (e) {
              e.errMsg.indexOf("suspend")
            }
          })
        } catch (V) {
          console.log(V)
        }
        if (e.isHttpDNS) {
          var t = e.xmppHosts[e.xmppIndex],
            o = t.domain,
            s = t.ip,
            n = "";
          if (s) {
            n = s;
            var r = t.port;
            "80" != r && (n += ":" + r)
          } else n = o;
          n && (e.url = "//" + n + "/ws")
        }
        return new _(e.url)
      };
    if (l.default) D = function (e, t) {
      if (e) try {
        if ((y = k(t)).onOpen(function () {
            console.log("onOpen"), K = 0, j = 1, t.autoReconnectNumTotal = 0;
            var o = [],
              s = (new Date).valueOf(),
              n = R.lookup("easemob.pb.Provision"),
              r = n.decode(o);
            t.context.jid.clientResource = t.deviceId + "_" + s.toString(), r.compressType = t.compressType, r.encryptType = t.encryptType, r.osType = t.osType, r.version = t.version, r.deviceName = t.deviceId, r.resource = t.deviceId + "_" + s.toString(), r.deviceUuid = s.toString(), r.auth = "$t$" + e.access_token, r = n.encode(r).finish();
            var i = R.lookup("easemob.pb.MSync"),
              a = i.decode(o);
            if (a.version = t.version, a.guid = t.context.jid, a.auth = "$t$" + e.access_token, a.command = 3, a.deviceId = t.deviceId, a.encryptType = t.encryptType, a.payload = r, a = i.encode(a).finish(), W(a), t.logOut = !1, t.offLineSendConnecting = !1, t.unSendMsgArr.length > 0)
              for (var c in t.unSendMsgArr) {
                var u = t.unSendMsgArr[c];
                t.sendMSync(u), delete t.unSendMsgArr[c]
              }
            t.onOpened()
          }), y.onClose(function (e) {
            if (console.log("onClose", e), !t.logOut && t.autoReconnectNumTotal < t.autoReconnectNumMax && (t.autoReconnectNumTotal <= t.xmppHosts.length && t.isHttpDNS || !t.isHttpDNS)) {
              t.reconnect();
              var o = {
                type: N.WEBIM_CONNCTION_DISCONNECTED
              };
              t.onError(o)
            } else if (t.logOut) t.clear(), t.onClosed();
            else {
              o = {
                type: N.WEBIM_CONNCTION_DISCONNECTED
              };
              t.onError(o), t.onClosed()
            }
          }), y.onMessage(function (e) {
            if (l.default) var o = R.lookup("easemob.pb.MSync").decode(e.data);
            else {
              for (var s = C.atob(e.data), n = [], r = 0, i = s.length; r < i; ++r) n.push(s.charCodeAt(r));
              o = R.lookup("easemob.pb.MSync").decode(n)
            }
            switch (o.command) {
              case 0:
                var a = R.lookup("easemob.pb.CommSyncDL");
                a = a.decode(o.payload);
                var c = new u.default(a.serverId.low, a.serverId.high, a.serverId.unsigned).toString(),
                  p = new u.default(a.metaId.low, a.metaId.high, a.metaId.unsigned).toString();
                if (0 !== a.metas.length) A(a.metas, a.status, t), L(a.nextKey, a.queue, t);
                else if (a.isLast) {
                  var d = w(O, a.queue);
                  !1 !== d && O.splice(d, 1), O.length > 0 && (B(O[0], t), this.qTimer && clearTimeout(this.qTimer))
                } else if (a.status && 0 === a.status.errorCode) {
                  if (v[p]) {
                    try {
                      v[p].success instanceof Function && v[p].success(p, c)
                    } catch (e) {
                      t.onError({
                        type: N.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                        data: e
                      })
                    }
                    delete v[p]
                  }
                  t.onReceivedMessage({
                    id: p,
                    mid: c
                  })
                } else if (a.status && 15 === a.status.errorCode) t.onMutedMessage({
                  mid: c
                });
                else if (a.status && 1 === a.status.errorCode) {
                  var h = "";
                  switch (a.status.reason) {
                    case "blocked":
                      h = N.PERMISSION_DENIED;
                      break;
                    case "group not found":
                      h = N.GROUP_NOT_EXIST;
                      break;
                    case "not in group or chatroom":
                      h = N.GROUP_NOT_JOINED;
                      break;
                    case "exceed recall time limit":
                      h = N.MESSAGE_RECALL_TIME_LIMIT;
                      break;
                    case "message recall disabled":
                      h = N.SERVICE_NOT_ENABLED;
                      break;
                    case "not in group or chatroom white list":
                      h = N.SERVICE_NOT_ALLOW_MESSAGING;
                      break;
                    default:
                      h = N.SERVER_UNKNOWN_ERROR
                  }
                  t.onError({
                    type: h,
                    reason: a.status.reason ? a.status.reason : "",
                    data: {
                      id: p,
                      mid: c
                    }
                  })
                } else if (a.status && 7 === a.status.errorCode && "sensitive words" === a.status.reason) t.onError({
                  type: N.MESSAGE_INCLUDE_ILLEGAL_CONTENT,
                  data: {
                    id: p,
                    mid: c
                  }
                });
                else {
                  if (v[p]) {
                    try {
                      v[p].fail instanceof Function && v[p].fail(p, c)
                    } catch (e) {
                      t.onError({
                        type: N.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                        data: e
                      })
                    }
                    delete v[p]
                  }
                  t.onError({
                    type: N.WEBIM_LOAD_MSG_ERROR,
                    data: {
                      errorCode: a.status && a.status.errorCode,
                      reason: a.status && a.status.reason
                    }
                  })
                }
                break;
              case 1:
                var f = R.lookup("easemob.pb.CommUnreadDL");
                if (0 === (f = f.decode(o.payload)).unread.length);
                else
                  for (r = 0; r < f.unread.length; r++) B(f.unread[r].queue, t);
                q();
                break;
              case 2:
                var m = R.lookup("easemob.pb.CommNotice").decode(o.payload);
                if (!1 !== w(O, m.queue)) return;
                O.push(m.queue), this.qTimer && clearTimeout(this.qTimer), this.qTimer = setTimeout(function () {
                  var e = m.queue;
                  !1 !== w(O, e) && B(e, t)
                }, 2e4), 1 == O.length && B(m.queue, t);
                break;
              case 3:
                U(o, t)
            }
          }), "" == (e.access_token || "")) {
          M.stringify(e);
          return void t.onError({
            type: N.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
            data: e
          })
        }
        t.context.accessToken = e.access_token
      } catch (V) {}
    };
    else var D = function (e, t) {
      if (e)
        if ((y = k(t)).onopen = function () {
            K = 0, j = 1, t.autoReconnectNumTotal = 0;
            var o = [],
              s = (new Date).valueOf(),
              n = R.lookup("easemob.pb.Provision"),
              r = n.decode(o);
            t.context.jid.clientResource = t.deviceId + "_" + s.toString(), r.compressType = t.compressType, r.encryptType = t.encryptType, r.osType = t.osType, r.version = t.version, r.deviceName = t.deviceId, r.resource = t.deviceId + "_" + s.toString(), r.deviceUuid = s.toString(), r.auth = "$t$" + e.access_token, r = n.encode(r).finish();
            var i = R.lookup("easemob.pb.MSync"),
              a = i.decode(o);
            if (a.version = t.version, a.guid = t.context.jid, a.auth = "$t$" + e.access_token, a.command = 3, a.deviceId = t.deviceId, a.encryptType = t.encryptType, a.payload = r, a = i.encode(a).finish(), W(a), t.logOut = !1, t.offLineSendConnecting = !1, t.unSendMsgArr.length > 0)
              for (var c in t.unSendMsgArr) {
                var u = t.unSendMsgArr[c];
                t.sendMSync(u), delete t.unSendMsgArr[c]
              }
            t.onOpened()
          }, y.onclose = function (e) {
            if (!t.logOut && t.autoReconnectNumTotal < t.autoReconnectNumMax && (t.autoReconnectNumTotal <= t.xmppHosts.length && t.isHttpDNS || !t.isHttpDNS)) {
              t.reconnect();
              var o = {
                type: N.WEBIM_CONNCTION_DISCONNECTED
              };
              t.onError(o)
            } else if (t.logOut) t.clear(), t.onClosed();
            else {
              o = {
                type: N.WEBIM_CONNCTION_DISCONNECTED
              };
              t.onError(o), t.onClosed()
            }
          }, y.onmessage = function (e) {
            for (var o = C.atob(e.data), s = [], n = 0, r = o.length; n < r; ++n) s.push(o.charCodeAt(n));
            var i = R.lookup("easemob.pb.MSync").decode(s);
            switch (i.command) {
              case 0:
                var a = R.lookup("easemob.pb.CommSyncDL");
                a = a.decode(i.payload);
                var c = new u.default(a.serverId.low, a.serverId.high, a.serverId.unsigned).toString(),
                  p = new u.default(a.metaId.low, a.metaId.high, a.metaId.unsigned).toString();
                if (0 !== a.metas.length) A(a.metas, a.status, t), L(a.nextKey, a.queue, t);
                else if (a.isLast) {
                  var d = w(O, a.queue);
                  !1 !== d && O.splice(d, 1), O.length > 0 && (B(O[0], t), this.qTimer && clearTimeout(this.qTimer))
                } else if (a.status && 0 === a.status.errorCode) {
                  if (v[p]) {
                    try {
                      v[p].success instanceof Function && v[p].success(p, c)
                    } catch (e) {
                      t.onError({
                        type: N.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                        data: e
                      })
                    }
                    delete v[p]
                  }
                  t.onReceivedMessage({
                    id: p,
                    mid: c
                  })
                } else if (a.status && 15 === a.status.errorCode) t.onMutedMessage({
                  mid: c
                });
                else if (a.status && 1 === a.status.errorCode) {
                  var l = "";
                  switch (a.status.reason) {
                    case "blocked":
                      l = N.PERMISSION_DENIED;
                      break;
                    case "group not found":
                      l = N.GROUP_NOT_EXIST;
                      break;
                    case "not in group or chatroom":
                      l = N.GROUP_NOT_JOINED;
                      break;
                    case "exceed recall time limit":
                      l = N.MESSAGE_RECALL_TIME_LIMIT;
                      break;
                    case "message recall disabled":
                      l = N.SERVICE_NOT_ENABLED;
                      break;
                    case "not in group or chatroom white list":
                      l = N.SERVICE_NOT_ALLOW_MESSAGING;
                      break;
                    default:
                      l = N.SERVER_UNKNOWN_ERROR
                  }
                  t.onError({
                    type: l,
                    reason: a.status.reason ? a.status.reason : "",
                    data: {
                      id: p,
                      mid: c
                    }
                  })
                } else if (a.status && 7 === a.status.errorCode && "sensitive words" === a.status.reason) t.onError({
                  type: N.MESSAGE_INCLUDE_ILLEGAL_CONTENT,
                  data: {
                    id: p,
                    mid: c
                  }
                });
                else {
                  if (v[p]) {
                    try {
                      v[p].fail instanceof Function && v[p].fail(p, c)
                    } catch (e) {
                      t.onError({
                        type: N.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                        data: e
                      })
                    }
                    delete v[p]
                  }
                  t.onError({
                    type: N.WEBIM_LOAD_MSG_ERROR,
                    data: {
                      errorCode: a.status && a.status.errorCode,
                      reason: a.status && a.status.reason
                    }
                  })
                }
                break;
              case 1:
                var h = R.lookup("easemob.pb.CommUnreadDL");
                if (0 === (h = h.decode(i.payload)).unread.length);
                else
                  for (n = 0; n < h.unread.length; n++) B(h.unread[n].queue, t);
                q();
                break;
              case 2:
                var f = R.lookup("easemob.pb.CommNotice").decode(i.payload);
                if (!1 !== w(O, f.queue)) return;
                O.push(f.queue), this.qTimer && clearTimeout(this.qTimer), this.qTimer = setTimeout(function () {
                  var e = f.queue;
                  !1 !== w(O, e) && B(e, t)
                }, 2e4), 1 == O.length && B(f.queue, t);
                break;
              case 3:
                U(i, t)
            }
          }, "" != (e.access_token || "")) t.context.accessToken = e.access_token;
        else {
          M.stringify(e);
          t.onError({
            type: N.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
            data: e
          })
        }
    };

    function w(e, t) {
      var o = "off";
      if (e.forEach(function (e, s) {
          if (e.name === t.name) return o = "on", s
        }), "off" == o) return !1
    }
    var L = function (e, t, o) {
        var s = [],
          n = R.lookup("easemob.pb.CommSyncUL"),
          r = n.decode(s);
        r.queue = t, r.key = new u.default(e.low, e.high, e.unsigned).toString(), r = n.encode(r).finish();
        var i = R.lookup("easemob.pb.MSync"),
          a = i.decode(s);
        if (a.version = o.version, a.encryptType = o.encryptType, a.command = 0, a.payload = r, a = i.encode(a).finish(), y.readyState !== _.OPEN) {
          var c = {
            type: N.WEBIM_CONNCTION_DISCONNECTED
          };
          o.onError(c)
        } else W(a)
      },
      A = function (e, t, o) {
        for (var s = 0; s < e.length; s++) {
          var n = new u.default(e[s].id.low, e[s].id.high, e[s].id.unsigned).toString();
          T.indexOf(n) < 0 && (1 === e[s].ns ? (0, r.default)(e[s], t, o) : 2 === e[s].ns ? (0, i.default)(e[s], t, o) : 3 === e[s].ns ? a.default.handleMessage(e[s], t, o) : 0 === e[s].ns ? (0, c.default)(e[s], t, o) : 4 === e[s].ns && o.registerConfrIQHandler && o.registerConfrIQHandler(e[s], t, o), T.length <= E ? T.push(n) : (T.shift(), T.push(n)))
        }
      },
      q = function () {
        var e = [],
          t = R.lookup("easemob.pb.StatisticsBody"),
          o = t.decode(e);
        o.operation = 0, o = t.encode(o).finish();
        var s = R.lookup("easemob.pb.Meta").decode(e);
        s.id = (new Date).valueOf(), s.ns = 0, s.payload = o;
        var n = R.lookup("easemob.pb.CommSyncUL"),
          r = n.decode(e);
        r.meta = s, r = n.encode(r).finish();
        var i = R.lookup("easemob.pb.MSync"),
          a = i.decode(e);
        a.version = "3.0.8", a.encryptType = [0], a.command = 0, a.payload = r, a = i.encode(a).finish(), W(a)
      },
      B = function (e, t) {
        var o = [],
          s = R.lookup("easemob.pb.CommSyncUL"),
          n = s.decode(o);
        n.queue = e, n = s.encode(n).finish();
        var r = R.lookup("easemob.pb.MSync"),
          i = r.decode(o);
        i.version = t.version, i.encryptType = t.encryptType, i.command = 0, i.payload = n, i = r.encode(i).finish(), W(i)
      },
      U = function (e, t) {
        var o = R.lookup("easemob.pb.Provision").decode(e.payload);
        t.context.jid.clientResource = o.resource, 0 == o.status.errorCode && H(t)
      },
      H = function (e) {
        var t = R.lookup("easemob.pb.MSync"),
          o = t.decode([]);
        o.version = e.version, o.encryptType = e.encryptType, o.command = 1, o = t.encode(o).finish(), W(o)
      };
    if (l.default) var W = function (e) {
      var t = {
        data: new Uint8Array(e).buffer
      };
      y.send(t)
    };
    else W = function (e) {
      for (var t = "", o = 0; o < e.length; o++) {
        t += String.fromCharCode(e[o])
      }
      t = C.btoa(t), y.send(t)
    };
    var G = function (e, t) {
        if ("" == (e = e || {}).user) return t.onError({
          type: N.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR
        }), !1;
        var o = e.user + "" || "",
          s = e.appKey || "",
          n = s.split("#");
        if (2 !== n.length) return t.onError({
          type: N.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
        }), !1;
        var r = n[0],
          i = n[1];
        return r && i ? (t.context.jid = {
          appKey: s,
          name: o,
          domain: t.domain,
          clientResource: t.clientResource
        }, t.context.root = R, t.context.userId = o, t.context.appKey = s, t.context.appName = i, t.context.orgName = r, !0) : (t.onError({
          type: N.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
        }), !1)
      },
      P = function e(t) {
        if (!this instanceof e) return new e(t);
        t = t || {};
        this.isDebug = t.isDebug || !1, this.isHttpDNS = t.isHttpDNS || !1, this.isMultiLoginSessions = t.isMultiLoginSessions || !1, this.wait = t.wait || 30, this.retry = t.retry || !1, this.https = t.https && "https:" === location.protocol, this.url = t.url, this.hold = t.hold || 1, this.route = t.route || null, this.inactivity = t.inactivity || 30, this.heartBeatWait = t.heartBeatWait || 4500, this.maxRetries = t.maxRetries || 5, this.isAutoLogin = !1 !== t.isAutoLogin, this.pollingTime = t.pollingTime || 800, this.stropheConn = !1, this.autoReconnectNumMax = t.autoReconnectNumMax || 0, this.autoReconnectNumTotal = 0, this.autoReconnectInterval = t.autoReconnectInterval || 0, this.context = {
          status: N.STATUS_INIT
        }, this.sendQueue = new s.default, this.intervalId = null, this.apiUrl = t.apiUrl || "", this.isWindowSDK = t.isWindowSDK || !1, this.encrypt = t.encrypt || {
          encrypt: {
            type: "none"
          }
        }, this.delivery = t.delivery || !1, this.appKey = t.appKey || "", this.domain = t.domain || "easemob.com", this.clientResource = "84ff3eba1", this.user = "", this.orgName = "", this.appName = "", this.token = "", this.unSendMsgArr = [], this.dnsArr = ["https://rs.easemob.com", "http://182.92.174.78", "http://112.126.66.111"], this.dnsIndex = 0, this.dnsTotal = this.dnsArr.length, this.restHosts = [], this.restIndex = 0, this.restTotal = 0, this.xmppHosts = [], this.xmppIndex = 0, this.xmppTotal = 0, this.groupOption = {}, this.version = t.version || "3.0.0", this.compressAlgorimth = t.compressAlgorimth || 0, this.userAgent = t.userAgent || 0, this.pov = t.pov || 0, this.command = t.command || 3, this.deviceId = t.deviceId || "webim", this.encryptKey = t.encryptKey || "", this.firstPayload = t.firstPayload || [], this.compressType = t.compressType || [0], this.encryptType = t.encryptType || [0], this.osType = 16, this.wxMiniProgram = l.default, window.this = this
      };
    P.prototype.registerUser = function (e) {
      this.isHttpDNS ? (this.dnsIndex = 0, this.getHttpDNS(e, "signup")) : this.signup(e)
    }, P.prototype.listen = function (e) {
      this.onOpened = e.onOpened || M.emptyfn, this.onClosed = e.onClosed || M.emptyfn, this.onTextMessage = e.onTextMessage || M.emptyfn, this.onEmojiMessage = e.onEmojiMessage || M.emptyfn, this.onPictureMessage = e.onPictureMessage || M.emptyfn, this.onAudioMessage = e.onAudioMessage || M.emptyfn, this.onVideoMessage = e.onVideoMessage || M.emptyfn, this.onFileMessage = e.onFileMessage || M.emptyfn, this.onLocationMessage = e.onLocationMessage || M.emptyfn, this.onCustomMessage = e.onCustomMessage || M.emptyfn, this.onCmdMessage = e.onCmdMessage || M.emptyfn, this.onStatisticMessage = e.onStatisticMessage || M.emptyfn, this.onPresence = e.onPresence || M.emptyfn, this.onRoster = e.onRoster || M.emptyfn, this.onError = e.onError || M.emptyfn, this.onReceivedMessage = e.onReceivedMessage || M.emptyfn, this.onInviteMessage = e.onInviteMessage || M.emptyfn, this.onDeliverdMessage = e.onDeliveredMessage || M.emptyfn, this.onReadMessage = e.onReadMessage || M.emptyfn, this.onRecallMessage = e.onRecallMessage || M.emptyfn, this.onMutedMessage = e.onMutedMessage || M.emptyfn, this.onOffline = e.onOffline || M.emptyfn, this.onOnline = e.onOnline || M.emptyfn, this.onConfirmPop = e.onConfirmPop || M.emptyfn, this.onCreateGroup = e.onCreateGroup || M.emptyfn, this.onUpdateMyGroupList = e.onUpdateMyGroupList || M.emptyfn, this.onUpdateMyRoster = e.onUpdateMyRoster || M.emptyfn, this.onBlacklistUpdate = e.onBlacklistUpdate || M.emptyfn, x(this.onOnline, this.onOffline)
    }, P.prototype.heartBeatID = 0, P.prototype.heartBeat = function (e) {
      this.stopHeartBeat(), this.heartBeatID = setInterval(function () {
        q()
      }, this.heartBeatWait)
    }, P.prototype.stopHeartBeat = function () {
      clearInterval(this.heartBeatID)
    }, P.prototype.getRestFromHttpDNS = function (e, t) {
      if (!(this.restIndex > this.restTotal)) {
        var o = "",
          s = this.restHosts[this.restIndex],
          n = s.domain,
          r = s.ip;
        if (r && "http:" == location.protocol) {
          var i = s.port;
          o = ("https:" === location.protocol ? "https:" : "http:") + "//" + r + ":" + i
        } else o = ("https:" === location.protocol ? "https:" : "http:") + "//" + n;
        "" != o && (this.apiUrl = o, e.apiUrl = o), "login" == t ? this.login(e) : this.signup(e)
      }
    }, P.prototype.getHttpDNS = function (e, t) {
      var o = this,
        s = {
          url: this.dnsArr[this.dnsIndex] + "/easemob/server.json",
          dataType: "json",
          type: "GET",
          data: {
            app_key: encodeURIComponent(e.appKey || this.appKey)
          },
          success: function (s, n) {
            var r = s.rest.hosts;
            if (r) {
              for (var i = o.https ? "https" : "http", a = r.filter(function (e, t) {
                  if (e.protocol == i) return e
                }), c = 0; c < a.length; c++)
                if (a[c].protocol === i) {
                  var u = a[c];
                  a.splice(c, 1), a.unshift(u)
                } o.restHosts = a, o.restTotal = a.length;
              try {
                Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
              } catch (V) {}
              var p = s["msync-ws"].hosts;
              if (p) {
                var d = p.filter(function (e, t) {
                  if (e.protocol == i) return e
                });
                for (c = 0; c < d.length; c++) d[c].protocol === i && (u = d[c], d.splice(c, 1), d.unshift(u));
                o.xmppHosts = d, o.xmppTotal = d.length, o.getRestFromHttpDNS(e, t)
              }
            }
          } || M.emptyfn,
          error: function (s, n, r) {
            console.log("getHttpDNS error", s, r), o.dnsIndex++, o.dnsIndex < o.dnsTotal && o.getHttpDNS(e, t)
          } || M.emptyfn
        };
      M.ajax(s)
    }, P.prototype.signup = function (e) {
      var t = this,
        o = e.orgName || "",
        s = e.appName || "",
        n = e.appKey || this.appKey,
        r = e.success || M.emptyfn,
        i = e.error || M.emptyfn;
      if (!o && !s && n) {
        var a = n.split("#");
        2 === a.length && (o = a[0], s = a[1])
      }
      if (o || s) {
        e.https || this.https;
        var c = (e.apiUrl || this.apiUrl) + "/" + o + "/" + s + "/users",
          u = {
            username: e.username,
            password: e.password,
            nickname: e.nickname || ""
          },
          p = {
            url: c,
            dataType: "json",
            data: M.stringify(u),
            success: r,
            error: function (o, s, n) {
              if (t.isHttpDNS && t.restIndex + 1 < t.restTotal) return t.restIndex++, void t.getRestFromHttpDNS(e, "signup");
              t.clear(), i(o)
            }
          };
        M.ajax(p)
      } else i({
        type: N.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
      })
    }, P.prototype.open = function (e) {
      var t = e.appKey,
        o = t.split("#")[0],
        s = t.split("#")[1];
      this.orgName = o, this.appName = s, e.accessToken && (this.token = e.accessToken), this.isHttpDNS ? (this.dnsIndex = 0, this.getHttpDNS(e, "login")) : this.login(e)
    }, P.prototype.login = function (e) {
      if (this.user = e.user, G(e, this)) {
        var t = this;
        if (!t.isOpened())
          if (e.accessToken) e.access_token = e.accessToken, D(e, t);
          else {
            var o = e.apiUrl,
              s = this.context.userId,
              n = e.pwd || "",
              r = this.context.appName,
              i = this.context.orgName,
              a = {
                grant_type: "password",
                username: s,
                password: n,
                timestamp: +new Date
              },
              c = {
                headers: {
                  "Content-type": "application/json"
                },
                url: o + "/" + i + "/" + r + "/token",
                dataType: "json",
                data: M.stringify(a),
                success: function (o, s) {
                  e.success && e.success(o), t.token = o.access_token, t.context.restTokenData = o.access_token, D(o, t)
                } || M.emptyfn,
                error: function (o, s, n) {
                  if (e.error && e.error(), t.isHttpDNS && t.restIndex + 1 < t.restTotal) return t.restIndex++, void t.getRestFromHttpDNS(e, "login");
                  t.clear(), o.error && o.error_description ? t.onError({
                    type: N.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
                    data: o,
                    xhr: s
                  }) : t.onError({
                    type: N.WEBIM_CONNCTION_OPEN_ERROR,
                    data: o,
                    xhr: s
                  })
                } || M.emptyfn
              };
            M.ajax(c)
          }
      }
    }, P.prototype.close = function (e) {
      this.logOut = !0, this.context.status = N.STATUS_CLOSING, y.close(), this.stopHeartBeat(), this.context.status = N.STATUS_CLOSING
    }, P.prototype.recallMessage = function (e) {
      var t = {
        id: this.getUniqueId(),
        type: "recall",
        group: e.type,
        ackId: e.mid,
        to: e.to,
        success: e.success,
        fail: e.fail
      };
      this.send(t, this)
    }, P.prototype.sendMSync = function (e) {
      for (var t = "", o = 0; o < e.length; o++) {
        t += String.fromCharCode(e[o])
      }
      if (y.readyState === _.OPEN) {
        if (l.default) return W(e);
        t = C.btoa(t), y.send(t)
      } else this.unSendMsgArr.push(t), !this.logOut && this.autoReconnectNumTotal < this.autoReconnectNumMax && (this.autoReconnectNumTotal <= this.xmppHosts.length && this.isHttpDNS || !this.isHttpDNS) && (this.offLineSendConnecting = !0, this.reconnect()), this.onError({
        type: N.WEBIM_CONNCTION_DISCONNECTED,
        reconnect: !0
      })
    }, P.prototype.getUniqueId = function (e) {
      this.autoIncrement ? this.autoIncrement++ : this.autoIncrement = 1;
      var t = new Date,
        o = new Date(2010, 1, 1);
      return t.getTime() - o.getTime() + this.autoIncrement
    }, P.prototype.send = function (e) {
      (0, n.default)(e, this), v[e.id] = e
    }, P.prototype.removeRoster = function (e) {
      a.default.operatRoster(e, "remove", this)
    }, P.prototype.subscribe = function (e) {
      a.default.operatRoster(e, "add", this)
    }, P.prototype.subscribed = function (e) {
      a.default.operatRoster(e, "accept", this)
    }, P.prototype.unsubscribed = function (e) {
      a.default.operatRoster(e, "decline", this)
    }, P.prototype.isOpened = function () {
      return y && y.readyState === _.OPEN
    }, P.prototype.clear = function () {
      var e = this.context.appKey;
      if (this.errorType != N.WEBIM_CONNCTION_DISCONNECTED && this.logOut && (this.unSendMsgArr = [], this.offLineSendConnecting = !1, this.context = {
          status: N.STATUS_INIT,
          appKey: e
        }), this.intervalId && clearInterval(this.intervalId), this.restIndex = 0, this.xmppIndex = 0, this.errorType == N.WEBIM_CONNCTION_CLIENT_LOGOUT || -1 == this.errorType) {
        var t = {
          data: {
            data: "logout"
          },
          type: N.WEBIM_CONNCTION_CLIENT_LOGOUT
        };
        this.onError(t)
      }
    };
    var K = 0,
      j = 1;
    P.prototype.reconnect = function (e) {
      var t = this;
      t.xmppIndex < t.xmppHosts.length - 1 && t.xmppIndex++, setTimeout(function () {
        D({
          access_token: t.context.accessToken
        }, t), K += j * j, j++
      }, 1e3 * (0 == this.autoReconnectNumTotal ? 0 : K)), this.autoReconnectNumTotal++
    }, P.prototype.closed = function () {
      var e = {
        data: {
          data: "Closed error"
        },
        type: N.WEBIM_CONNECTION_CLOSED
      };
      this.onError(e), this.stopHeartBeat()
    }, P.prototype.addToBlackList = function (e) {
      a.default.operatRoster({
        to: e.name
      }, "ban", this)
    }, P.prototype.removeFromBlackList = function (e) {
      a.default.operatRoster({
        to: e.name
      }, "allow", this)
    }, P.prototype._getGroupJid = function (e) {
      return (this.context.appKey || "") + "_" + e + "@conference." + this.domain
    }, Object.assign(P.prototype, p.default), m.connection = P, m.utils = M, m.statusCode = N, m.message = o.default, m.doQuery = function (e, t, o) {
      void 0 !== window.cefQuery && window.cefQuery({
        request: e,
        persistent: !1,
        onSuccess: t,
        onFailure: o
      })
    }, m.version = f, window.WebIM = m, module.hot && module.hot.accept(), m.debug = function (e) {};
    var F = m;
    exports.default = F;
  }, {
    "./allnode": "G7Dp",
    "./status": "KLYY",
    "./message": "KTph",
    "./queue": "RCHR",
    "./chat/sendChatMessage": "Aofe",
    "./chat/handleChatMessage": "TvlR",
    "./muc/HandleMucMessage": "wnFo",
    "./roster/HandleRosterMessage": "UOYe",
    "./statistics/HandleStatisticsMessage": "pE/p",
    "long": "YA3p",
    "./restApis": "np0Q",
    "./weichatPb/protobuf": "z2Zv",
    "./checkEnv": "PkDd",
    "sockjs-client": "EWtC",
    "Base64": "wTgU",
    "protobufjs": "fN30",
    "./utils": "K0yk",
    "./wx/utils": "a9jn"
  }],
  "Focm": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var e = t(require("./src/connection"));

    function t(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    var r = e.default;
    exports.default = r;
  }, {
    "./src/connection": "h12o"
  }]
}, {}, ["Focm"], "WebIM")