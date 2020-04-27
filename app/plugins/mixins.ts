import Vue from 'vue'

import MPage from '~/components/layout/MPage.vue'
import MForm from '~/components/layout/MForm.vue'
import MColumn from '~/components/layout/MColumn.vue'
import MModal from '~/components/layout/MModal.vue'
import MPanel from '~/components/layout/MPanel.vue'
import MCard from '~/components/layout/MCard.vue'

// components/ui
import CButton from '~/components/ui/CButton.vue'
import CTextInput from '~/components/ui/CTextInput.vue'
import CLabel from '~/components/ui/CLabel.vue'
import CLabeledItem from '~/components/ui/CLabeledItem.vue'
import CDropdown from '~/components/ui/CDropdown.vue'
import CMessage from '~/components/ui/CMessage.vue'
import CError from '~/components/ui/CError.vue'
import CSortButton from '~/components/ui/CSortButton.vue'
import CCheckbox from '~/components/ui/CCheckbox.vue'
import CSelectList from '~/components/ui/CSelectList.vue'

Vue.mixin({
    components: {
        // layout
        MPage,
        MForm,
        MColumn,
        MModal,
        MPanel,
        MCard,
        // ui
        CButton,
        CTextInput,
        CLabel,
        CLabeledItem,
        CDropdown,
        CMessage,
        CError,
        CSortButton,
        CCheckbox,
        CSelectList
    }
})

