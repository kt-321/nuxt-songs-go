<template>
    <div class="c-labeled-item" :class="{ inline: inline }">
        <div v-if="label" class="c-labeled-item-label">
            <c-label :label="label" :required="required" />
        </div>
        <div class="c-labeled-item-content">
            <slot :disabled="disabled" />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class CLabeledItem extends Vue {
    // label名
    @Prop(String) label!: string
    // 必須項目であるか
    @Prop(Boolean) required?: boolean
    // インラインレイアウトか否か
    @Prop(Boolean) inline?: boolean
    // 無効状態か否か
    @Prop(Boolean) disabled?: boolean
}
</script>
<style lang="stylus">
.c-labeled-item
    .c-labeled-item-label
        margin-bottom: 4px
        .c-label-content
            font-size: $form-item-font-size
    &.inline
        flex-box()
        .c-labeled-item-label
            flex: 0 0 $form-item-inline-label-width
            padding-top: 4px
            margin-bottom: 0
        .c-labeled-item-content
            flex: 1 1 auto
</style>