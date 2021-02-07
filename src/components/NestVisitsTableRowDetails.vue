<template>
  <transition
    enter-active-class="transition ease-out duration-100"
    enter-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75"
    leave-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <tr v-if="visible">
      <td colspan="100%">
        <!-- description list table row show/hide visibility -->
        <div class="bg-gray-50">

          <!-- description list -->
          <div class="px-4 py-5 sm:px-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3">

              <!-- left grid -->
              <div class="sm:col-span-1 flex flex-col space-y-3">
                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Visit Date
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.visit_date }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Species
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.species }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Observers
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.observers }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Agency
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.agency }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Survey Type
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.survey_type }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Source
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.source }}
                  </dd>
                </div>
              </div>

              <!-- center grid -->
              <div class="sm:col-span-1 flex flex-col space-y-3">
                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Nest Condition
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.nest_condition }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Nest Size
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.nest_size }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Decorations
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.decorations }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Occupied
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.occupied }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Breeding Stage
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.breeding_stage }}
                  </dd>
                </div>
              </div>

              <!-- right grid -->
              <div class="sm:col-span-1 flex flex-col space-y-3">
                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Adult Count
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.adult_count_clarify }} {{ nestVisit.adult_count }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Adult Behavior
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.adult_behavior }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Production Count
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.production_count_clarify }} {{ nestVisit.production_count }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Young Stage
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.young_stage }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Production Notes
                  </dt>
                  <dd class="mt-0.5 text-sm text-gray-900">
                    {{ nestVisit.production_notes }}
                  </dd>
                </div>
              </div>

              <!-- comments -->
              <div class="sm:col-span-2 md:col-span-3">
                <dt class="text-sm font-medium text-gray-500">
                  Nest Visit Comments
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ nestVisit.comments }}
                </dd>
              </div>
            </dl>
          </div>
        </div>

      </td>
    </tr>
  </transition>
</template>

<script>
export default {
  name: 'NestVisitsTableRowDetails',

  props: {
    nestVisit: {
      type: Object,
      required: true
    },

    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>
