<template>
    <div></div>
</template>

<script>
export default {
    methods: {
        closeModal(modalId) {
            const modalElement = document.getElementById(modalId);
            if (modalElement) {
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                    modalElement.addEventListener('hidden.bs.modal', () => {
                        document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
                    });
                }
            }
        }
    }
}
</script>
  
