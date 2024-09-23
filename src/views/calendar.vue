<script setup>
import { reactive, ref, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import axios from 'axios'

const fullCalendar = ref(null)
let calApi = null

const currentEvents = ref([])
const selectedEvent = ref(null)
const modalMessage = ref('');

// Données pour le formulaire du modal
const eventName = ref('')
const eventStart = ref('')
const eventEnd = ref('')
const eventColor = ref('')

// Options du calendrier
const calendarOptions = reactive({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
  ],
  headerToolbar: {
    start: 'prev,next today',
    center: 'title',
    end: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  initialView: 'dayGridMonth',
  dateClick: handleDateClick,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  locale: frLocale,
  buttonText: {
    today: "Aujourd'hui",
    month: "Mois",
    week: "Semaine",
    day: "Jour"
  },
  eventClick: handleEventClick,
  select: handleSelect,
  eventDrop: handleEventDrop
})

function showModal(message) {
    modalMessage.value = message; 
    const modal = new bootstrap.Modal(document.getElementById('right-modal'));
    modal.show();
}

function handleEventClick(clickInfo) {
  selectedEvent.value = clickInfo.event;

  eventName.value = selectedEvent.value.title;
  eventStart.value = selectedEvent.value.startStr;
  eventEnd.value = selectedEvent.value.endStr;
  eventColor.value = selectedEvent.value.backgroundColor;

  const myModal = new bootstrap.Modal(document.getElementById('edit_event'));
  myModal.show();
}

function handleEventDrop(eventDropInfo) {
  // Récupérez l'événement déplacé
  const event = eventDropInfo.event;

  // Mettez à jour les données de l'événement sélectionné
  selectedEvent.value = event;

  eventName.value = event.title;
  eventStart.value = event.startStr;
  eventEnd.value = event.endStr;
  eventColor.value = event.backgroundColor;

  // Affichez la modal d'édition
  const editModal = new bootstrap.Modal(document.getElementById('edit_event'));
  editModal.show();
}

function handleSelect(selectionInfo) {
  // Vérifiez si une sélection chevauche un événement existant
  const selectedStart = selectionInfo.startStr;
  const selectedEnd = selectionInfo.endStr;

  const overlappingEvents = currentEvents.value.filter(event =>
    (event.start <= selectedEnd && event.end >= selectedStart)
  );

  if (overlappingEvents.length > 0) {
    // Si des événements existent déjà, ouvrez le modal d'édition
    selectedEvent.value = overlappingEvents[0]; 
    eventName.value = selectedEvent.value.title;
    eventStart.value = selectedEvent.value.start;
    eventEnd.value = selectedEvent.value.end;
    eventColor.value = selectedEvent.value.color;

    const editModal = new bootstrap.Modal(document.getElementById('edit_event'));
    editModal.show();
  } else {
    // Sinon, ouvrez le modal d'ajout
    eventStart.value = selectedStart;
    eventEnd.value = selectedEnd;
    eventName.value = '';
    eventColor.value = '';

    const addModal = new bootstrap.Modal(document.getElementById('add_event'));
    addModal.show();
  }
}

function handleDateClick(info) {
  eventStart.value = info.dateStr
  eventEnd.value = info.dateStr
  eventName.value = ''
  eventColor.value = '' 

  const myModal = new bootstrap.Modal(document.getElementById('add_event'))
  myModal.show()
}

function deleteEvent() {
  const eventId = selectedEvent.value.id;

  axios.post('http://localhost/GestionPersonnel/backend/events.php?action=deleteEvent', new URLSearchParams({
    'eventId': eventId
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      if (response.data.success) {
        selectedEvent.value.remove();
        showModal('Événement supprimé avec succès');
        loadEvents();
      } else {
        showModal(response.data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showModal("Une erreur s'est produite lors de la suppression de l'événement.");
    });
}

function updateEvent() {
  if (!selectedEvent.value) {
    showModal("Aucun événement sélectionné.");
    return;
  }

  const eventId = selectedEvent.value.id;

  const eventData = new URLSearchParams();
  eventData.append('eventId', eventId);
  eventData.append('title', eventName.value);
  eventData.append('startDate', eventStart.value);
  eventData.append('endDate', eventEnd.value);
  eventData.append('color', eventColor.value);

  axios.post('http://localhost/GestionPersonnel/backend/events.php?action=updateEvent', eventData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      if (response.data.success) {
        // Mettre à jour les propriétés de l'événement sélectionné dans le calendrier
        selectedEvent.value.setProp('title', eventName.value);
        selectedEvent.value.setDates(eventStart.value, eventEnd.value);
        selectedEvent.value.setProp('backgroundColor', eventColor.value);

        showModal('Événement mis à jour avec succès');

        // Réinitialisation des champs
        eventName.value = '';
        eventStart.value = '';
        eventEnd.value = '';
        eventColor.value = '';
        
        selectedEvent.value = null;

        // Fermer le modal d'édition
        const editModal = bootstrap.Modal.getInstance(document.getElementById('edit_event'));
        if (editModal) {
          editModal.hide();
        }

        loadEvents();
      } else {
        showModal(response.data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showModal("Une erreur s'est produite lors de la mise à jour de l'événement.");
    });
}

function handleEvents(events) {
  if (calApi) {
    calApi.removeAllEvents();
    events.forEach(event => calApi.addEvent(event));
  }
  currentEvents.value = events
}

function loadEvents() {
  axios.get('http://localhost/GestionPersonnel/backend/events.php?action=getEvents')
    .then(response => {
      const events = response.data.map(event => ({
        id: event.id,
        title: event.title,
        start: event.startDate,
        end: event.endDate,
        color: event.color || 'blue'
      }));
      handleEvents(events);
    })
    .catch(error => {
      console.error('Erreur lors du chargement des événements', error)
    })
}

function submitEvent() {
  if (!eventName.value || !eventStart.value || !eventEnd.value) {
    alert("Tous les champs doivent être remplis.");
    return;
  }
  const eventData = new URLSearchParams();
  eventData.append('title', eventName.value);
  eventData.append('startDate', eventStart.value);
  eventData.append('endDate', eventEnd.value);
  eventData.append('color', eventColor.value);

  axios.post('http://localhost/GestionPersonnel/backend/events.php?action=addEvent', eventData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      showModal('Événement ajouté avec succès');
      eventName.value = '';
      eventStart.value = '';
      eventEnd.value = '';
      eventColor.value = '';

      const addModal = bootstrap.Modal.getInstance(document.getElementById('add_event'));
      if (addModal) {
        addModal.hide();
      }
      loadEvents();
    })
    .catch(error => {
      showModal("Une erreur s'est produite lors de l'enregistrement de l'événement.");
      console.error('Erreur', error)
    });
}

onMounted(() => {
  calApi = fullCalendar.value.getApi();
  loadEvents();

  const buttons = document.querySelectorAll('.fc-toolbar .fc-button');

  buttons.forEach(button => {
      button.classList.add('default'); 
      button.addEventListener('click', function() {
          buttons.forEach(btn => {
              btn.classList.remove('clicked');
              btn.classList.add('default'); 
          });
          this.classList.add('clicked'); 
          this.classList.remove('default');
      });
  });
});

</script>
<style>
.fc-toolbar .fc-button {
    background-color: #F2F3F4; 
    color: #7A7C7F; 
    border: none;
}

.fc-toolbar .fc-button.clicked {
    background-color: #FF902F !important; 
    color: white !important; 
}

.fc-daygrid-day-number {
  color: black !important;
}

.fc-col-header-cell {
  background-color: #ECEDEE;
  color: white !important;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  padding: 10px;
}

@media (max-width: 767.98px) {
  .fc .fc-toolbar.fc-header-toolbar {
    display: block;
    text-align: center;
  }

  .fc-header-toolbar .fc-toolbar-chunk {
    display: block;
  }

  .fc-header-toolbar .fc-toolbar-chunk:nth-child(1) {
    display: flex;
    justify-content: flex-start;
    position: relative;
    bottom: 5px;
    right: 0;
    width: 100%;
  }

  .fc-header-toolbar .fc-toolbar-chunk:nth-child(2) {
    text-align: center;
    justify-content: center;
    position: absolute;
    font-size: 10px;
    top: 82px;
    left: 50%;
    transform: translateX(-25%);
    width: 100%;
  }

  .fc-header-toolbar .fc-toolbar-chunk:nth-child(3) {
    display: flex;
    justify-content: flex-end;
    position: relative;
    text-align: center;
    bottom: 2px;
  }
}
</style>

<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="content container-fluid">
        <div class="page-header">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="page-title">Evènements</h3>
            </div>
            <div class="col-auto float-end ms-auto">
              <a class="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_event"><i class="fa-solid fa-plus"></i>
                Ajouter un évènement</a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <div class="card mb-0">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <FullCalendar class="app-calendar" :options="calendarOptions" ref="fullCalendar">
                      <template v-slot:eventContent='arg'>
                        <b>{{ arg.timeText }}</b>
                        <i>{{ arg.event.title }}</i>
                      </template>
                    </FullCalendar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="add_event" class="modal custom-modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Ajouter un évènement</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitEvent">
                <div class="input-block mb-3">
                  <label class="col-form-label">Titre<span class="text-danger">*</span></label>
                  <input class="form-control" type="text" v-model="eventName" />
                </div>
                <div class="input-block mb-3">
                  <label class="col-form-label">Date de début<span class="text-danger">*</span></label>
                  <input class="form-control" type="date" v-model="eventStart" />
                </div>
                <div class="input-block mb-3">
                  <label class="col-form-label">Date de fin<span class="text-danger">*</span></label>
                  <input class="form-control" type="date" v-model="eventEnd" />
                </div>
                <div class="input-block mb-3">
                  <label class="control-label col-form-label">Catégorie</label>
                  <select class="select form-control" v-model="eventColor">
                    <option value="red">Danger</option>
                    <option value="green">Success</option>
                    <option value="purple">Purple</option>
                    <option value="blue">Primary</option>
                    <option value="pink">Pink</option>
                    <option value="cyan">Info</option>
                    <option value="gray">Inverse</option>
                    <option value="orange">Orange</option>
                    <option value="brown">Brown</option>
                    <option value="teal">Teal</option>
                    <option value="yellow">Warning</option>
                  </select>
                </div>
                <div class="submit-section">
                  <button class="btn btn-primary submit-btn" type="submit">Soumettre</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div id="edit_event" class="modal custom-modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modifier un évènement</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="input-block mb-3">
                  <label class="col-form-label">Titre<span class="text-danger">*</span></label>
                  <input class="form-control" type="text" v-model="eventName" />
                </div>
                <div class="input-block mb-3">
                  <label class="col-form-label">Date de début<span class="text-danger">*</span></label>
                  <input class="form-control" type="date" v-model="eventStart" />
                </div>
                <div class="input-block mb-3">
                  <label class="col-form-label">Date de fin<span class="text-danger">*</span></label>
                  <input class="form-control" type="date" v-model="eventEnd" />
                </div>
                <div class="input-block mb-3">
                  <label class="control-label col-form-label">Catégorie</label>
                  <select class="select form-control" v-model="eventColor">
                    <option value="red">Danger</option>
                    <option value="green">Success</option>
                    <option value="purple">Purple</option>
                    <option value="blue">Primary</option>
                    <option value="pink">Pink</option>
                    <option value="cyan">Info</option>
                    <option value="gray">Inverse</option>
                    <option value="orange">Orange</option>
                    <option value="brown">Brown</option>
                    <option value="teal">Teal</option>
                    <option value="yellow">Warning</option>
                  </select>
                </div>
                <div class="submit-section">
                  <button type="button" class="btn btn-success submit-btn save-event"
                    @click="updateEvent">Modifier</button>
                  <button type="button" class="btn btn-danger submit-btn delete-event" data-bs-dismiss="modal"
                    @click="deleteEvent">Supprimer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div id="right-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="text-center">
                <p>{{ modalMessage }}</p>
                <button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
