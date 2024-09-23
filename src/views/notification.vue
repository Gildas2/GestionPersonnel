
<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-md-6">
                <div class="alert alert-success">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                        ×</button>
                   <span class="glyphicon glyphicon-ok"></span> <strong>Message de réussite</strong>
                    <hr class="message-inner-separator">
                    <p>
                        Envoi d'un email ! Veuillez vérifier votre boîte de réception.  <i class="fas fa-envelope" style="color: black;"></i></p>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
    export default{
        name: "notification",
        data() {
            return{

            }
        }
    }
</script>
<style scoped>
    hr.message-inner-separator
    {
        clear: both;
        margin-top: 20px;
        margin-bottom: 20px;
        border: 0;
        height: 1px;
        background-image: -webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0));
    }
    .container{
        position: absolute;
        left: 30%;
    }
    </style>
     