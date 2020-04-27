<template>
    <div v-if="song" class="c-song-detail-comment">
        <m-card>
            <ul v-if="song.comments.length !== 0" class="comments">
                <li v-for="(comment, index) in song.comments" :key="index" class="comment">
                    <ul>
                        <li v-if="comment.created_at === comment.updated_at">
                            <a :href="commentUserLink(comment)">{{ commentUser(comment).name }}</a>
                            {{ comment.body }}
                            <p v-if="model.id && model.id === comment.id" style="color: red">(編集中)</p>
                        </li>
                        <li v-if="comment.created_at !== comment.updated_at">
                            <a :href="commentUserLink(comment)">{{ commentUser(comment).name }}</a>
                            {{ comment.body }}
                            <p v-if="model.id && model.id === comment.id" style="color: red">(編集中)</p>
                        </li>
                        <li v-if="comment.created_at === comment.updated_at">
                            投稿日時{{ comment.updated_at }}
                        </li>
                        <li v-if="comment.created_at !== comment.updated_at">
                            投稿日時（更新日時）{{ comment.updated_at }}
                        </li>
                    </ul>
                    <c-button v-if="comment.user_id === $store.getters['user/user'].id" class="button-delete" label="削除" danger small @c-click="deleteCommentButtonHandler(comment)" />
                    <c-button v-if="comment.user_id === $store.getters['user/user'].id" class="button-edit" label="編集" secondary small @c-click="editCommentButtonHandler(comment)" />
                </li>
            </ul>
            <p v-if="song.comments.length === 0">まだコメントはありません。</p>
            <m-form class="c-song-edit-form">
                <c-error :errors.sync="errors" />
                <c-text-input :model.sync="model.body" multiline />
                <c-button v-if = "!model.id" class="button-confirm" label="投稿" primary small @c-click="commentButtonHandler" />
                <c-button v-if = "model.id" class="button-update" label="変更する" small @c-click="editSaveButtonHandler(model)" />
                <c-button v-if = "model.id" class="button-cancel" label="編集をキャンセル" small @c-click="cancelEditButtonHandler(model)" />
            </m-form>
        </m-card>
    </div>
</template>
<script lang="ts">
import _ from 'lodash'
import { Component, Vue, Prop, PropSync, Watch } from 'vue-property-decorator'
import { ISong } from '~/types/song'
import { ApplicationError, BadRequest } from '~/types/error'
@Component
export default class CSongDetailComment extends Vue {
    @Prop(Object) song!: ISong
    errors: Array<ApplicationError> = []
    model = {
        id: null,
        body: ''
    }

    commentUser(comment: any) {
        return this.$store.getters['user/findById'](comment.user_id)
    }

    commentUserLink(comment: any) {
        const userId = this.commentUser(comment).id
        return `user/${userId}`
    }

    // 完了ボタンが押された
    saveButtonDisabled: boolean = false
    async commentButtonHandler() {
        try {
            this.errors = []
            // バリデーション
            if (this.model.body.length === 0) {
                this.errors.push(new BadRequest('コメントが入力されていません'))
            }
            await this.$axios.$post(`/api/song/${this.song.id}/comment`, this.model)
            this.model.body = ''
            this.$emit('song-comment-edit-finished-handler')
            this.model.body = ''
        } catch (e) {
            this.errors.push(e)
        }
    }

    async deleteCommentButtonHandler(comment: any) {
        if (confirm(`コメントを削除します。よろしいですか？`)) {
            await this.$axios.$delete(`/api/comment/${comment.id}`).catch((e) => {
                const { message, code } = e.response.data
                throw new ApplicationError(message, code)
            })
            this.$emit('song-comment-delete-finished-handler')
        }
    }

    async editCommentButtonHandler(comment: any) {
        this.model = _.cloneDeep(comment)
    }

    async editSaveButtonHandler(model :any) {
        try {
            this.errors = []
            // バリデーション
            if (this.model.body.length === 0) {
                throw new BadRequest('内容は必須項目です')
            }
            const sendData = _.cloneDeep(this.model)
            await this.$axios.$put(`/api/song/${this.song.id}/comment/${model.id}`, sendData)
            this.$emit('song-comment-edit-finished-handler')
        } catch (e) {
            this.errors.push(e)
        }
    }

    cancelEditButtonHandler(model: any) {
        this.model.id = null
        this.model.body = ''
        this.errors = []
    }
}
</script>
<style lang="stylus">
.c-song-edit-form
    .c-text-input
        ::placeholder
            text-align right
</style>