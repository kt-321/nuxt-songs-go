<template>
    <label class="c-checkbox" :class="{ disabled: disabled }">
        <input v-model="syncChecked" type="checkbox" class="c-checkbox-input" :disabled="disabled" @change="checkedHandler" />
        <span class="c-checkbox-parts">{{ text }}</span>
    </label>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync, Emit } from 'vue-property-decorator'
@Component({})
export default class CCheckbox extends Vue {
    @Prop({ default: '' }) text!: String
    @PropSync('checked', { default: false }) syncChecked!: boolean
    @Prop({ type: Boolean, default: false }) disabled!: boolean
    @Emit('c-change')
    private checkedHandler() {}
}
</script>
<style lang="stylus">
.c-checkbox
  cursor: pointer
  &-input
    display: none;
    &:checked + .c-checkbox-parts::after
      content ""
      display block
      position absolute
      top: 2px
      left: 6px
      width: 6px
      height: 10px
      transform rotate(45deg)
      border-bottom 3px solid rgba(15, 59, 138, 0.54)
      border-right 3px solid rgba(15, 59, 138, 0.54)
      box-sizing: border-box
    &:disabled
      border-bottom 3px solid rgba(15, 59, 138, 0.14)
      border-right 3px solid rgba(15, 59, 138, 0.14)
      background-color: #eee
  &-parts
    padding-left 24px
    position relative
    &:before
      content ""
      display block
      position absolute
      top -1px
      left 0
      width 18px
      height 18px
      border 3px solid rgba(15, 59, 138, 0.54)
      border-radius 3px
      box-sizing: border-box
      background-color: #fff
  &.disabled
    color: #999
    .c-checkbox-input
      opacity: 0.5
    .c-checkbox-parts
      &:before
        opacity: 0.5
</style>