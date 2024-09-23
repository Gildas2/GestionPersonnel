<template>
  <div class="wrapper">
    <ChatDashboard></ChatDashboard>
    <div class="page-wrapper">
      <div class="chat-main-row">
        <div class="chat-main-wrapper">
          <div class="col-lg-9 message-view task-view">
            <div class="chat-window">
              <!-- <div class="fixed-header">
                <div
                  class="navbar"
                  v-for="(receiver, index) in receiver"
                  :key="index"
                >
                  <div class="user-details me-auto">
                    <div class="float-start user-img">
                      <router-link class="avatar">
                        <img :src="receiver.url" class="rounded-circle" />
                        <span class="status online"></span>
                      </router-link>
                    </div>
                    <div class="user-info float-start">
                      <a>
                        <span>{{ receiver.firstName }} {{ receiver.lastName }}</span>
                      </a>
                      <span class="last-seen"></span>
                    </div>
                  </div>
                </div>
              </div> -->
              <div class="chat-contents">
                <div class="chat-content-wrap">
                  <div class="chat-wrap-inner">
                    <div class="chat-box">
                      <div class="chats">
                        <div
                          v-for="message in messages"
                          :key="message.id"
                          :class="message.sender_id === userStore.id ? 'chat chat-right' : 'chat chat-left'"
                        >
                          <div v-if="message.sender_id !== userStore.id" class="chat-avatar">
                            <a class="avatar">
                              <img :src="message.url" alt="User Image" />
                            </a>
                          </div>
                          <div class="chat-body">
                            <div class="chat-bubble">
                              <div class="chat-content">
                                <p>{{ message.content }}</p>
                                <span class="chat-time">{{ message.created_at }}</span>
                              </div>
                              <div class="chat-action-btns">
                                <ul>
                                  <li>
                                    <a class="share-msg" title="Share">
                                      <i class="fa-solid fa-share-nodes"></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a class="edit-msg">
                                      <i class="fa-solid fa-pencil"></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a class="del-msg">
                                      <i class="fa-regular fa-trash-can"></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="chat-line">
                          <span class="chat-date"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chat-footer">
                <div class="message-bar">
                  <div class="message-inner">
                    <a class="link attach-icon" data-bs-toggle="modal" data-bs-target="#drag_files">
                      <img src="../assets/img/attachment.png" alt="Attachment Icon" />
                    </a>
                    <div class="message-area">
                      <div class="input-group">
                        <textarea
                          class="form-control"
                          placeholder="Type message..."
                          v-model="chatInput"
                          @keydown.enter.prevent="sendMessage"
                        ></textarea>
                        <button class="btn btn-custom" type="button" @click="sendMessage">
                          <i class="fa-solid fa-paper-plane"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatDashboard from "./chatDashboard.vue";
import { useUserStore } from "../stores/authStore";
import Pusher from "pusher-js";

export default {
  name: "chat",
  components: {
    ChatDashboard,
  },
  data() {
    return {
      messages: [],
      chatInput: "",
      pusher: null,
      channel: null,
      receiver: [],
      userStore: useUserStore(),
      room_id: null,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.room_id = id;
    this.fetchContactDetails(id);

    // Initialiser Pusher
    this.pusher = new Pusher("75f00c49befa2a81fb1a", {
      cluster: "ap1",
      encrypted: true,
    });

    this.channel = this.pusher.subscribe("chat");
    this.channel.bind("message-sent", (data) => {
      this.messages.push(data);
    });

    this.fetchMessages();
  },
  methods: {
    fetchContactDetails(id) {
      const formData = new FormData();
      formData.append("sender_id", this.userStore.id);
      formData.append("room_id", this.room_id);

      this.$axios
        .get(`chat.php?action=fetchContactDetails&id=${id}`)
        .then((response) => {
          this.receiver = response.data;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des détails du contact:", error);
        });
    },

    fetchMessages() {
      const room_id = this.room_id;
      this.$axios
        .get(`chat.php?action=getMessages&room_id=${room_id}`)
        .then((response) => {
          this.messages = response.data.messages;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des messages:", error);
        });
    },

    sendMessage() {
      if (this.chatInput.trim() === "") return;

      const formData = new FormData();
      formData.append("sender_id", this.userStore.id);
      formData.append("room_id", this.room_id);
      formData.append("message", this.chatInput);

      // Envoyer le message au backend
      this.$axios
        .post("sendChat.php?method=sendMessage", formData)
        .then(() => {
          const newMessage = {
            sender_id: this.userStore.id,
            room_id: this.room_id,
            content: this.chatInput,
            time: new Date().toLocaleString(), 
          };
          this.messages.push(newMessage);
          this.chatInput = ""; 
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi du message:", error);
        });
    },
  },
};
</script>

<style>
/* Your styles here */
</style>
