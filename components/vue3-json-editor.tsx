import { ComponentPublicInstance, defineComponent, getCurrentInstance, onMounted, reactive, watch } from 'vue'
import JsonEditor from './assets/jsoneditor'
import './assets/jsoneditor.css'
import './style.css'

export const Vue3JsonEditor = defineComponent({
  props: {
    modelValue: [String, Boolean, Object, Array]
  },
  setup (props: any, { emit }) {
    const root = getCurrentInstance()?.root.proxy as ComponentPublicInstance

    const state = reactive({
      editor: null as any,
      error: false,
      json: {},
      internalChange: false,
      uid: `jsoneditor-vue-${getCurrentInstance()?.uid}`
    })

    watch(
      () => props.modelValue as unknown as any,
      async (val) => {
        if (!state.internalChange) {
          state.json = val
          await setEditor(val)
          state.error = false
        }
      }, { immediate: true })

    onMounted(() => {
      const options = {
        mode: 'code',
        mainMenuBar: false,
        onChange () {
          try {
            const json = state.editor.get()
            state.json = json
            state.error = false
            state.internalChange = true
            emit('update:modelValue', json)
            root.$nextTick(function () {
              state.internalChange = false
            })
          } catch (e) {
            state.error = true
            emit('has-error', e)
          }
        }
      }
      state.editor = new JsonEditor(
        document.querySelector(`#${state.uid}`),
        options,
        state.json
      )

      emit('provide-editor', state.editor)
    })
    function setEditor (value: any): void {
      if (state.editor) state.editor.set(value)
    }

    return () => {
      return (
        <div>
          <div id={state.uid} class={'jsoneditor-vue'}></div>
        </div>
      )
    }
  }
})
