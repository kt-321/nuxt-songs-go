<template>
    <section v-if="errors && errors.length > 0" class="c-error c-form-item">
        <ul class="errors">
            <li v-for="(error, index) in errors" :key="index" class="error">
                {{ error.message }}
                <em v-if="error.code > 0">({{ error.code }})</em>
            </li>
        </ul>
    </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ApplicationError } from '~/types/error'
@Component
export default class CError extends Vue {
    @Prop({ type: Array, default: [] }) errors?: Array<ApplicationError>
}
</script>
<style lang="stylus">
.c-error
    padding: 16px
    font-size: 14px
    line-height: 170%
    border-radius: 4px
    color: $danger-color
    background-color: $danger-bg-color
    border: 1px solid $danger-border-color
    .errors
        @extend .zero-space
        list-style: none
        .error
            @extend .zero-space
            font-weight: bold
            em
                font-style: normal
                font-size: 80%
</style>