<template>
  <div class="main-wrapper">
    <Header ></Header>

     <!-- Sidebar de chats existants -->
     <div class="sidebar" id="sidebar">
      <div class="sidebar-inner slimscroll">
        <div id="sidebar-menu" class="sidebar-menu">
          <nav class="greedy">
            <ul class="link-item">
              <li>
                <a href="/dashboard">
                  <i class="la la-home"></i>
                  <span>Back to Home</span>
                </a>
              </li>
              <li class="menu-title">
                Direct Chats
                <a data-bs-toggle="modal" data-bs-target="#add_chat_user">
                  <i class="fa-solid fa-plus"></i>
                </a>
              </li>
              <!-- Liste des contacts ajoutés -->
              <li v-for="room in rooms" :key="room.id">
                <a :href="generateChatLink(room.id)">
                  <span class="chat-avatar-sm user-img">
                    <img
                      class="rounded-circle"
                      :src="room.url"
                      alt="User Image"
                    />
                    <span class="status online"></span>
                  </span>
                  <span class="chat-user">{{ room.firstName }} {{ room.lastName }}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Modal pour ajouter des contacts au chat -->
    <div id="add_chat_user" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Direct Chat</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group m-b-30">
              <input
                placeholder="Rechercher un contact"
                class="form-control search-input"
                type="text"
                v-model="searchQuery"
              />
              <button class="btn btn-primary" @click="searchContacts">Rechercher</button>
            </div>
            <div>
              <ul class="chat-user-list">
                <li
                  v-for="chatUser in filteredUsers"
                  :key="chatUser.id"
                  @click="selectUser(chatUser)"
                  :class="{'selected': selectedUser && selectedUser.id === chatUser.id}"
                >
                  <a>
                    <div class="chat-block d-flex">
                      <span class="avatar align-self-center flex-shrink-0">
                        <img :src="chatUser.url" alt="User Image" />
                      </span>
                      <div class="media-body align-self-center text-nowrap flex-grow-1">
                        <div class="user-name">
                          {{ chatUser.lastName }} {{ chatUser.firstName }}
                        </div>
                        <span class="designation">{{ chatUser.poste_nom }}</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="submit-section">
              <button class="btn btn-primary submit-btn" @click="addToChatList">Ajouter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header.vue';
import { useUserStore } from '../stores/authStore';

export default {
  name: 'chatDashboard',
  components: {
    Header
  },
  data() {
    return {
      chatUsers: [],
      rooms: [],
      selectedUser: null,
      searchQuery: '',
      id: null,
    };
  },
  created() {
    this.userStore = useUserStore();
    this.id = this.userStore.id;
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) {
        return this.chatUsers;
      }
      return this.chatUsers.filter(chatUser =>
        `${chatUser.firstName} ${chatUser.lastName}`
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    generateChatLink(roomId) {
    return this.$router.resolve({ name: 'chat', params: { id: roomId } }).href;
  },
    selectUser(chatUser) {
      this.selectedUser = chatUser;
    },
    addToChatList() {
      const data = new FormData();
      data.append("receiver_id", this.selectedUser.id);
      data.append("sender_id", this.userStore.id);

      if (this.selectedUser) {
        this.$axios
          .post("chat.php?action=addRoom", data)
          .then((res) => {
            if (!res.data.error) {
              alert("Room ajouté avec succès");
              this.selectedEmploye = null; 
              const modal = bootstrap.Modal.getInstance(
                document.getElementById("add_chat_user")
              );
              modal.hide(); // Fermer le modal
            } else {
              console.error("Erreur", res.data.message);
            }
          })
          .catch((error) => {
            console.error("Erreur", error);
          });
      }
    },
    listRooms() {
      this.$axios
        .get(`chat.php?action=listRooms&id=${this.userStore.id}`)
        .then((res) => {
          if (!res.data.error) {
            this.rooms = res.data.rooms; 
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
    listChatUsers() {
      this.$axios
        .get(`employe.php?action=listChatUsers&id=${this.userStore.id}`)
        .then((res) => {
          if (!res.data.error) {
            this.chatUsers = res.data.chatUsers;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
  },
  mounted() {
    this.listChatUsers(); 
    this.listRooms();
  },
};
</script>

<style>

</style>