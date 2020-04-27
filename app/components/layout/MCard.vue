<template>
    <section class="card-layout" :class="getClass">
        <h3 v-if="title && title.length > 0" class="card-title">{{ title }}</h3>
        <div class="card-content">
            <slot />
        </div>
    </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    name: 'm-card'
})
export default class MCard extends Vue {
    // パネルタイトル
    @Prop({ type: String, default: null }) title?: string
    // カラーリング
    @Prop(Boolean) primary!: boolean
    @Prop(Boolean) secondary!: boolean
    @Prop(Boolean) light!: boolean
    @Prop(Boolean) dark!: boolean
    @Prop(Boolean) info!: boolean
    @Prop(Boolean) success!: boolean
    @Prop(Boolean) warning!: boolean
    @Prop(Boolean) danger!: boolean
    get getClass() {
        return {
            'title-disabled': !(this.title && this.title.length > 0),
            primary: this.primary,
            secondary: this.secondary,
            light: this.light,
            dark: this.dark,
            info: this.info,
            success: this.success,
            warning: this.warning,
            danger: this.danger
        }
    }
}
</script>
<style lang="stylus">
.card-layout
    position: relative
    .card-title
        position: relative
        padding: $card-title-padding
        font-size: $font-normal
        font-weight: 400
        color: $secondary-color
        background-color: $secondary-bg-color
        border: 1px solid $secondary-border-color
        border-bottom: 0
        border-top-left-radius: $card-border-radius
        border-top-right-radius: $card-border-radius
        margin-bottom 0
    .card-content
        background-color: #fff
        padding: $card-content-padding
        border: 1px solid $secondary-border-color
        border-top: 0
        border-bottom-left-radius: $card-border-radius
        border-bottom-right-radius: $card-border-radius
        > *
            margin-bottom: $card-content-margin-bottom
            &:last-child
                margin-bottom: 0
    &.title-disabled
        .card-content
            border-top: 1px solid $secondary-border-color
            border-top-left-radius: $card-border-radius
            border-top-right-radius: $card-border-radius
    &.primary
        .card-title
            color: $primary-color
            background-color: $primary-bg-color
            border-color: $primary-border-color
        .card-content
            border-color: $primary-border-color
    &.secondary
        .card-title
            color: $secondary-color
            background-color: $secondary-bg-color
            border-color: $secondary-border-color
        .card-content
            border-color: $secondary-border-color
    &.light
        .card-title
            color: $light-color
            background-color: $light-bg-color
            border-color: $light-border-color
        .card-content
            border-color: $light-border-color
    &.dark
        .card-title
            color: $dark-color
            background-color: $dark-bg-color
            border-color: $dark-border-color
        .card-content
            border-color: $dark-border-color
    &.info
        .card-title
            color: $info-color
            background-color: $info-bg-color
            border-color: $info-border-color
        .card-content
            border-color: $info-border-color
    &.success
        .card-title
            color: $success-color
            background-color: $success-bg-color
            border-color: $success-border-color
        .card-content
            border-color: $success-border-color
    &.warning
        .card-title
            color: $warning-color
            background-color: $warning-bg-color
            border-color: $warning-border-color
        .card-content
            border-color: $warning-border-color
    &.danger
        .card-title
            color: $danger-color
            background-color: $danger-bg-color
            border-color: $danger-border-color
        .card-content
            border-color: $danger-border-color
</style>