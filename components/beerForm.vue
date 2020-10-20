<template>
  <div class="beer-form__container">
    <Form :model="formModel">
      <Row>
        <Col span="24">
          <FormItem label="Name" prop="name">
            <Input v-model.trim="formModel.name"/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <FormItem label="Description" prop="description">
            <Input v-model.trim="formModel.description"
                   :rows="6"
                   type="textarea"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Row type="flex">
      <Col>
        <div class="no-margin">
          <Button type="primary"
                  @click="$_onSubmitForm()"
                  @keyup.native.enter="$_onSubmitForm()">
            <span>Save</span>
          </Button>

          <Button type="default"
                  @click="$_onCancel"
                  v-if="formModel.id">
            Cancel
          </Button>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import _ from 'lodash';
import {mixinEventId} from '~/lib/mixins/event-ids';

function copyModel(m) {
  let model = _.cloneDeep(m);
  return model;
}

export default {
  name: "beer-form",

  mixins: [mixinEventId],

  props: {
    beer: {
      type: Object,
      default: {},
    },
  },
  mounted() {
    if ('id' in this.beer) {
      this.formModel = copyModel(this.beer);
    }
  },
  data: function () {
    return {
      formModel: {
        name: '',
        description: '',
      },
    }
  },

  methods: {
    $_onEdit() {
      this.formModel = copyModel(this.beer);
    },

    $_onCancel() {
      this.formModel = copyModel(this.beer);
      this.$emit('on-save');
    },

    $_onSubmitForm() {
      this.$store.dispatch('beers/EDIT_BEER', this.formModel);
      this.$root.$emit(this.EVENT_ID_ALERT_SHOW, {
        type: 'success',
        title: 'Edit beer.',
        text: 'Beer edit success.'
      })
      this.$emit('on-save');
    }
  },

  watch: {
    beer: function (newValue) {
      if (newValue) {
        this.formModel = copyModel(newValue);
      }
    }
  }
}
</script>
