<template>
    <m-modal
        :visible.sync="modalVisible"
        width="500px"
        height="80vh"
        :title="syncModel.image_url === null ? syncModel.title + '画像を設定' : syncModel.title + 'の画像を変更'"
        :is-only-close="true"
        @close="modalVisible = false"
    >
        <c-error :errors.sync="errors" />
        <div class="song-photo">
                <img v-if="syncModel.image_url" class="song__icon" :src="syncModel.image_url" />
                <img v-else class="song__icon" src="/img/song-icon.jpeg">
                <div>
                    <input
                        class="avator__input"
                        type="file"
                        id="avator-input"
                        accept="image/png,image/jpeg,image/gif"
                        v-on:change="uploadIcon"
                        style="display: none"
                    />
                    <c-button class="avator__button" label="画像を選択する" small success @c-click="selectAvator" />
                </div>
            </div>
    </m-modal>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Watch, Emit } from 'vue-property-decorator'
import { ISong } from '~/types/song'
import { ApplicationError, BadRequest } from '~/types/error'
@Component
export default class CSongIcon extends Vue {
    @PropSync('visible') modalVisible!: boolean
    @PropSync('model') syncModel!: ISong
    errors: Array<ApplicationError> = []
    iconErrors: Array<ApplicationError> = []
    iconUrl: string = ''
    
    selectAvator() {
      const input: HTMLInputElement | null = document.querySelector('#avator-input');
      if (input) {
        input.click()
      }
    }
    
    async uploadIcon(e: any) {
        this.iconErrors = []
        e.preventDefault()
        try {
            const files = e.target.files ? e.target.files : e.dataTransfer.files
            const file = files[0]
            const params = new FormData()
            params.append('file', file)
            if (e.target.files.length === 0) {
                return null
            }
            const avatorfile = e.target.files[0];
            let response: any = null
            response = await this.$axios.$post(`/api/song/${this.syncModel.id}/image`, params)
            this.modalVisible = false
            this.$emit('c-song-icon-uploaded')
        } catch (e) {
            this.iconErrors.push(e)
        }
    }
}
</script>
<style lang="stylus">
.song-photo
    text-align center
    .song__icon
        height: 300px
        width: 300px
        margin-bottom 5px
</style>