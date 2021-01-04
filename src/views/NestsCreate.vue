<template>
  <div class="container mx-auto pt-16 overflow-y-auto">
    <form @submit.prevent="createNest" class="w-5/6 mx-auto text-gray-700">
      <h1 class="text-2xl text-gray-700">Create a New Nest</h1>
      <p class="text-gray-700">
        Complete the form below to enter a new nest.
      </p>

      <!-- <h2 class="text-lg leading-loose mt-2">Nest Details</h2>
      <p>
        These fields are for the relatively unchanging details about the nests.
        For instance, the things that won't change between visits to a nests.
      </p> -->

      <label for="nest_id" class="block mt-3">
        <span class="text-gray-700">Nest ID</span>
        <input
          type="text"
          class="w-full form-input mt-1 block bg-gray-100 text-gray-700 cursor-not-allowed"
          readonly="readonly"
          v-model="nest.id"
        >
      </label>

      <!-- habitat info -->
      <fieldset class="mt-6 bg-gray-200 p-4">
        <legend class="text-xl">Habitat & Location Details</legend>

        <label for="Habitat Category" class="block mt-3">
          <span class="text-gray-700">Habitat Category</span>
          <p class="text-sm font-light mt-1">
            Select the option that best describes the habitat type for the nesting area.
          </p>
          <select name="habitat_category" class="w-full form-select mt-1 block" v-model="nest.habitat_category">
            <option value="">Select One</option>
            <option>Agriculture</option>
            <option>Canyon</option>
            <option>Creosote scrub</option>
            <option>Desert wash</option>
            <option>Developed - other</option>
            <option>Grassland</option>
            <option>Joshua tree</option>
            <option>Mixed conifer</option>
            <option>Pinyon and/or Juniper</option>
            <option>Riparian - aspen</option>
            <option>Riparian - other</option>
            <option>Salt desert scrub</option>
            <option>Shoreline</option>
            <option>Sagebrush</option>
            <option>Other</option>
          </select>
        </label>

        <label class="block mt-3">
          <span class="text-gray-700">Habitat Description</span>
          <p class="text-sm font-light mt-1">
            General description of the habitat characteristics of the nest site location.
          </p>
          <input type="text" class="w-full form-input mt-1 block" v-model="nest.habitat_description">
        </label>

        <label class="block mt-3">
          <span class="text-gray-700">Location</span>
          <p class="text-sm font-light mt-1">
            General description of the survey area location and relevant landmarks
            (e.g. mountain range, rivers, landscape features).
          </p>
          <input type="text" class="w-full form-input mt-1 block" v-model="nest.location">
        </label>
      </fieldset>

      <fieldset class="mt-6 bg-gray-200 p-4">
        <legend class="text-xl">Nest Details</legend>

        <label for="Nest Substrate" class="block mt-3">
          <span class="text-gray-700">Nest Substrate</span>
          <p class="text-sm font-light mt-1">
            The substrate upon which the nest is located. More specific details
            should be provided in the nest comments field.
          </p>
          <select name="nest_substrate" class="w-full form-select mt-1 block" v-model="nest.nest_substrate">
            <option value="">Select one</option>
            <option>Artificial</option>
            <option>Cliff</option>
            <option>Ground - surface</option>
            <option>Ground - subterranean</option>
            <option>Outcrop</option>
            <option >Shrub</option>
            <option>Tree</option>
          </select>
        </label>

        <label for="Nest Type" class="block mt-3">
          <span class="text-gray-700">Nest Type</span>
          <select name="nest_type" class="w-full form-select mt-1 block" v-model="nest.nest_type">
            <option value="">Select one</option>
            <option>Burrow</option>
            <option>Cavity</option>
            <option>Scrape</option>
            <option>Stick nest</option>
          </select>
        </label>

        <label for="probable_origin" class="block mt-3">
          <span class="text-gray-700">Probable Origin</span>
          <p class="text-sm font-light mt-1">
            Select the species you believe initially constructed the nest. Probable origin is based
            on which species the observer believed to have initially constructed the nest. Variables
            such as size, material, and placement are considered when assessing probable origin
          </p>
          <select name="probable_origin" class="w-full form-select mt-1 block" v-model="nest.probable_origin">
            <option value="">Select one</option>
            <option>Accipter</option>
            <option>Accipiter/Buteo</option>
            <option>Burrowing Owl</option>
            <option>Buteo</option>
            <option>Buteo/Corvid</option>
            <option>Corvid</option>
            <option>Eagle</option>
            <option>Eagle/Buteo</option>
            <option>Falcon</option>
            <option>Ferruginous Hawk</option>
            <option>Northern Goshawk</option>
            <option>Osprey</option>
            <option>Other</option>
          </select>
        </label>

        <label for="nest_comments" class="block mt-3">
          <span class="text-gray-700">Nest Comments</span>
          <p class="text-sm font-light mt-1">
            Description of the unchanging characteristics of the nest itself. Including,
            but not limited to tree or shrub species, height above ground, etc.
          </p>
          <textarea class="w-full form-textarea mt-1 block" rows="3" v-model="nest.nest_comments"></textarea>
        </label>
      </fieldset>

      <!-- Observations -->
      <h2 class="text-2xl mt-8">Nest Vists</h2>
      <p>
        These fields are for entering unique visits to a nest. These details can change
        over time.
      </p>

      <!-- observation details section -->
      <fieldset class="mt-5 bg-gray-200 p-4">
        <legend class="text-xl">Observation Details</legend>

        <label for="observation_date" class="block mt-4">
            <span>Observation Date</span>
            <input
              name="observation_date"
              type="date"
              class="w-full form-input mt-1 block"
              v-model="observations.date"
            >
          </label>

          <label for="observers" class="block mt-4">
            <span>Observers</span>
            <p class="text-sm font-light mt-1">
              Name of observer(s). If multiple separate by a semi-colon (;).
            </p>
            <input
              name="observers"
              type="text"
              class="w-full form-input mt-1 block"
              v-model="observations.observers"
            >
          </label>

          <label for="agency" class="block mt-4">
            <span>Agency</span>
            <input
              name="agency"
              type="text"
              class="w-full form-input mt-1 block"
              v-model="observations.agency"
            >
          </label>

          <label for="survey_type" class="block mt-4">
            <span>Survey Type</span>
            <p class="text-sm font-light mt-1">
              Select the best option for the type of survey this is.
            </p>
            <select
              name="survey_type"
              class="w-full form-select mt-1 block"
              v-model="observations.survey_type"
            >
              <option value="">Select one</option>
              <option>Aerial</option>
              <option>Boat</option>
              <option>Ground - incidental</option>
              <option>Ground - passive/no callback</option>
              <option>Ground - broadcast/callback</option>
              <option>Not noted</option>
            </select>
          </label>

          <label for="source" class="block mt-4">
            <span>Source</span>
            <p class="text-sm font-light mt-1">
              Description of the data source, project, and/or reference. For example,
              "2019 NDOW goshawk broadcast survey data form". Leave blank if not noted.
            </p>
            <input
              name="source"
              type="text"
              class="w-full form-input mt-1 block"
              v-model="observations.source"
            >
          </label>
      </fieldset>

      <!-- location information -->
      <fieldset class="mt-5 bg-gray-200 p-4">
        <legend class="text-xl">Location Details</legend>

        <l-map
          style="height: 350px;"
          class="w-full my-4"
          :zoom="map.zoom"
          :center="map.center"
        >
          <l-tile-layer :url="map.url" />
          <l-marker
            ref="marker"
            :lat-lng.sync="nestLocation"
            :draggable="true"
            :visible="map.markerVisible"
          />
        </l-map>

        <label for="lat" class="block mt-3">
          <span class="text-gray-700">Latitude</span>
          <input
            type="text"
            class="w-full form-input mt-1 block"
            v-model.number="nestLocation.lat"
            @input="updateNestLocation()"
          >
        </label>

        <label for="long" class="block mt-3">
          <span class="text-gray-700">Longitude</span>
          <input
            type="text"
            class="w-full form-input mt-1 block"
            v-model.number="nestLocation.lng"
            @input="updateNestLocation()"
          >
        </label>

        <div class="block mt-3">
          <span>Are these the exact coordinates of the nest?</span>
          <div class="mt-2">
            <div>
              <label class="inline-flex items-center" for="yes">
                <input type="radio" class="form-radio" id="yes" value="yes" v-model="observations.exactCoordinates">
                <span class="ml-2">Yes</span>
              </label>
            </div>
            <div>
              <label class="inline-flex items-center" for="no">
                <input type="radio" class="form-radio" id="no" value="no" v-model="observations.exactCoordinates">
                <span class="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>

        <!-- if exact coordinates === "no" show these fields -->
        <label
          class="block mt-3"
          v-if="showLocationModifiers"
        >
          <span class="text-gray-700">Distance</span>
          <p class="text-sm font-light mt-1">
            The distance, in meters to the nest.
          </p>
          <input
            type="number"
            class="w-full form-input mt-1 block"
            v-model.number="observations.distance"
          >
        </label>

        <label
          v-if="showLocationModifiers"
          class="block mt-4"
        >
            <span>Direction</span>
            <p class="text-sm font-light mt-1">
              Approximate direction to the nest from the recorded coordinates.
            </p>
            <select
              class="w-full form-select mt-1 block"
              v-model="observations.direction"
            >
              <option value=""></option>
              <option>N</option>
              <option>NE</option>
              <option>E</option>
              <option>SE</option>
              <option>S</option>
              <option>SW</option>
              <option>W</option>
              <option>NW</option>
            </select>
          </label>

      </fieldset>

      <fieldset class="mt-5 bg-gray-200 p-4">
        <legend class="text-xl">Nest Details</legend>

        <label for="nest_condition" class="block mt-4">
          <span>Nest Condition</span>
          <p class="text-sm font-light mt-1">
            What is the general condition of the nest. Leave blank if not noted.
          </p>
          <select
            name="nest_condition"
            class="w-full form-select mt-1 block"
            v-model="observations.nest_condition"
          >
            <option value="">Select one</option>
            <option>Intact</option>
            <option>Deteriorating</option>
            <option>Destroyed</option>
            <option>Not found</option>
          </select>
        </label>

        <label
          v-if="showNestSize"
          for="nest_size"
          class="block mt-4"
        >
          <span>Nest Size</span>
          <p class="text-sm font-light mt-1">
            If this is a stick nest, what is the approximate sieze of the nest?
          </p>
          <select
            name="nest_size"
            class="w-full form-select mt-1 block"
            v-model="observations.nest_size"
          >
            <option value="">Select one</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>Extra Large</option>
          </select>
        </label>

        <div class="block mt-3">
          <span>Are there nest decorations?</span>
          <div class="mt-2">
            <div>
              <label class="inline-flex items-center" for="yes">
                <input type="radio" class="form-radio" id="yes" value="yes" v-model="observations.decorations">
                <span class="ml-2">Yes</span>
              </label>
            </div>
            <div>
              <label class="inline-flex items-center" for="no">
                <input type="radio" class="form-radio" id="no" value="no" v-model="observations.decorations">
                <span class="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset class="mt-5 bg-gray-200 p-4">
        <legend class="text-xl">Raptor Observations</legend>

        <label for="occupied" class="block mt-4">
          <span>Is the Nest Occupied?</span>
          <select
            name="occupied"
            class="w-full form-select mt-1 block"
            v-model="observations.occupied"
          >
            <option value="">Select one</option>
            <option>Yes</option>
            <option>No</option>
            <option>Undetermined</option>
          </select>
        </label>

        <!-- if nest occupied === yes then show these fields belwo -->
        <label
          v-if="showNestOccupiedModifiers"
          class="block mt-4"
        >
          <span>Breeding Stage</span>
          <select
            name="nest_condition"
            class="w-full form-select mt-1 block"
            v-model="observations.breeding_stage"
          >
            <option value="">Select one</option>
            <option>Courtship</option>
            <option>Failed</option>
            <option>Fledged</option>
            <option>Incubation</option>
            <option>Incubation/brooding - stage unclear</option>
            <option>Nestling</option>
            <option>Territorial bird(s) - stage unclear</option>
          </select>
        </label>

        <label
          v-if="showNestOccupiedModifiers"
          class="block mt-4"
        >
          <span>Species</span>
          <p class="text-sm font-light mt-1">
            Common name for the species observed at or using the nest. If no birds are
            observed or if the species is undetermined, leave blank.
          </p>
          <input
            name="species"
            type="text"
            class="w-full form-input mt-1 block"
            v-model="observations.species"
          >
        </label>
      </fieldset>

      <fieldset
        v-if="showNestOccupiedModifiers"
        class="mt-5 bg-gray-200 p-4"
      >
        <legend class="text-xl">Adult Observations</legend>

        <label for="adult_count" class="block mt-4">
          <span>Number of Adults Observed</span>
          <p class="text-sm font-light mt-1">
            Leave blank if no adults are observed during visit.
          </p>
          <input
            name="adult_count"
            type="number"
            min="0"
            class="w-full form-input mt-1 block"
            v-model.number="observations.adult_count"
          >
        </label>

        <label
          v-if="showAdultModifiers"
          for="adult_behavior"
          class="block mt-4"
        >
          <span>Adult Behavior</span>
          <p class="text-sm font-light mt-1">
            Description of the behavior of the adults, if observed.
          </p>
          <input
            name="observers"
            type="text"
            class="w-full form-input mt-1 block"
            v-model="observations.adult_behavior"
          >
        </label>
      </fieldset>

      <fieldset
        v-if="showNestOccupiedModifiers"
        class="mt-5 bg-gray-200 p-4"
      >
        <legend class="text-xl">Production Observations</legend>

        <label for="young_count" class="block mt-4">
          <span>Number of Young Observed</span>
          <p class="text-sm font-light mt-1">
            Leave blank if no adults are observed during visit.
          </p>
          <input
            name="young_count"
            type="number"
            min="0"
            class="w-full form-input mt-1 block"
            v-model.number="observations.production_count"
          >
        </label>

        <label
          v-if="showProductionModifiers"
          for="young_stage"
          class="block mt-4"
        >
          <span>Young Stage</span>
          <p class="text-sm font-light mt-1">
            What is the evidence of reproduction observed?
          </p>
          <select
            name="young_stage"
            class="w-full form-select mt-1 block"
            v-model="observations.young_stage"
          >
            <option value="">Select one</option>
            <option>Egg(s)</option>
            <option>Nestling(s)</option>
            <option>Brancher(s)</option>
            <option>Fledgling(s)</option>
          </select>
        </label>
      </fieldset>

      <label for="comments" class="block mt-3">
        <span class="text-gray-700">Observation or Visit Comments</span>
        <p class="text-sm font-light mt-1">
          Miscellaneous comments detailing any other important information regarding the nest or observations.
        </p>
        <textarea class="w-full form-textarea mt-1 block" rows="3" v-model="observations.comments"></textarea>
      </label>

      <!-- form buttons -->
      <div class="my-8 w-full flex justify-end">
        <button type="submit" class="text-white bg-olive border-0 py-2 px-6 focus:outline-none hover:bg-olive-darker rounded text-lg">Submit Nest</button>
      </div>
    </form>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import generateId from '@/services/IdService.js'

export default {
  components: {
    LMap, LTileLayer, LMarker
  },

  data () {
    return {
      nestLocation: {
        lat: 38.8568,
        lng: -115.7080
      },
      nest: {
        id: '',
        location: '',
        habitat_category: '',
        habitat_description: '',
        nest_substrate: '',
        nest_type: '',
        probable_origin: '',
        nest_comments: ''
      },
      observations: {
        exactCoordinates: null,
        distance: null,
        direction: null,
        date: '',
        observers: '',
        agency: '',
        survey_type: '',
        source: '',
        nest_condition: '',
        nest_size: '',
        decorations: '',
        occupied: '',
        breeding_stage: '',
        species: '',
        adult_count: null,
        adult_county_clarify: '',
        adult_behavior: '',
        young_stage: '',
        production_count: null,
        production_count_clafify: '',
        production_notes: '',
        comments: ''
      },
      map: {
        center: [38.8568, -115.7080],
        zoom: 7,
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        markerVisible: true
      }
    }
  },

  computed: {
    nestData () {
      return {
        ...this.nest,
        lat: this.nestLocation.lat,
        long: this.nestLocation.lng
      }
    },

    nestObservations () {
      return {
        nestId: this.nest.id,
        ...this.observations
      }
    },

    showNestSize () {
      return this.nest.nest_type === 'Stick nest'
    },

    showLocationModifiers () {
      // return !!this.observations.exactCoordinates || t
      return this.observations.exactCoordinates === 'no'
    },

    showNestOccupiedModifiers () {
      return this.observations.occupied === 'Yes'
    },

    showAdultModifiers () {
      return this.observations.adult_count > 0
    },

    showProductionModifiers () {
      return this.observations.production_count > 0
    }
  },

  methods: {
    async createNest () {
      // create nest
      await fetch('http://localhost:3000/nests', {
        method: 'POST',
        body: JSON.stringify(this.nestData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })

      await fetch('http://localhost:3000/observations', {
        method: 'POST',
        body: JSON.stringify(this.nestObservations),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })

      this.$router.push({
        name: 'nests-show',
        params: { id: this.nest.id }
      })
      this.resetForm()
    },

    async generateNestId () {
      const id = await generateId()
      this.nest.id = id
    },

    resetForm () {
      this.nest.id = ''
      this.nest.lat = ''
      this.nest.long = ''
      this.nest.location = ''
      this.nest.habitat_category = ''
      this.nest.habitat_description = ''
      this.nest.nest_substrate = ''
      this.nest.nest_type = ''
      this.nest.probable_origin = ''
      this.nest.nest_comments = ''
    },

    updateNestLocation () {
      this.$refs.marker.mapObject.setLatLng(this.nestLocation)
    }
  },

  mounted () {
    this.generateNestId()
  }
}
</script>

<style>

</style>
