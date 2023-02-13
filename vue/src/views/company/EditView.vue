<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/store.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import InputGroup from "@/components/InputGroup.vue";
import InputLabel from "@/components/InputLabel.vue";
import InputField from "@/components/InputField.vue";
import InputSelect from "@/components/InputSelect.vue";
import InputButton from "@/components/InputButton.vue";
import ValidationError from "@/components/ValidationError.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();
const error = ref(null);

const { err: industryError, collection: industries } = await store.all(
  "industries"
);
error.value = industryError;

const { err: categoryError, collection: categories } = await store.all(
  "categories"
);
error.value = categoryError;

const { err: companyError, data } = await store.getOne(
  "companies",
  route.params.id
);
error.value = companyError;

const validationErrors = ref([]);
const company = reactive({
  industryId: data?.industry_id.toString(),
  categoryId: data?.category_id.toString(),
  name: data?.name,
  nip: data?.nip,
  regon: data?.regon,
  province: data?.province,
  district: data?.district,
  community: data?.community,
  city: data?.city,
  propertyNumber: data?.property_number,
  apartmentNumber: data?.apartment_number,
  zipCode: data?.zip_code,
  street: data?.street,
  postCity: data?.post_city,
  phoneNumber: data?.phone_number,
  email: data?.email,
});

const onSubmit = async () => {
  const editingCompany = {
    industryId: company.industryId,
    categoryId: company.categoryId,
    name: company.name,
    nip: company.nip,
    regon: company.regon,
    province: company.province,
    district: company.district,
    community: company.community,
    city: company.city,
    propertyNumber: company.propertyNumber,
    apartmentNumber: company.apartmentNumber,
    zipCode: company.zipCode,
    street: company.street,
    postCity: company.postCity,
    phoneNumber: company.phoneNumber,
    email: company.email,
  };

  const { err, validationErr, data } = await store.update(
    "companies",
    route.params.id,
    editingCompany
  );

  error.value = err;
  validationErrors.value = validationErr;

  if (data?.status == 200) {
    router.push({ name: "companies.show", params: { id: route.params.id } });
  }
};

const destroy = async (id) => {
  if (confirm("Potwierdź")) {
    const { err, data } = await store.destroy("companies", id);
    error.value = err;
    if (data?.status == 204) {
      router.push({ name: "companies.index" });
    }
  }
};
</script>

<template>
  <HeaderTwo>Edycja</HeaderTwo>
  <AppAlert v-if="error" type="danger">{{ error.message }}</AppAlert>
  <form v-if="data" @submit.prevent="onSubmit">
    <InputGroup>
      <InputLabel for="industryId">Gałąź</InputLabel>
      <InputSelect
        v-model="company.industryId"
        :items="industries"
        id="industryId"
        placeholder="Obowiązkowe"
      ></InputSelect>
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'industryId'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="categoryId">Kategoria</InputLabel>
      <InputSelect
        v-model="company.categoryId"
        :items="categories"
        id="categoryId"
        placeholder="Obowiązkowe"
      ></InputSelect>
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'categoryId'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="name">Nazwa</InputLabel>
      <InputField
        v-model="company.name"
        name="name"
        id="name"
        placeholder="Obowiązkowe"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'name'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="nip">NIP</InputLabel>
      <InputField v-model="company.nip" id="nip" placeholder="NIP" />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'nip'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="regon">Regon</InputLabel>
      <InputField v-model="company.regon" id="regon" placeholder="Regon" />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'regon'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="province">Województwo</InputLabel>
      <InputField
        v-model="company.province"
        id="province"
        placeholder="Nieobowiązkowe"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'province'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="district">Dzielnica</InputLabel>
      <InputField
        v-model="company.district"
        id="district"
        placeholder="Nieobowiązkowe"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'district'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="community">Gmina</InputLabel>
      <InputField
        v-model="company.community"
        id="community"
        placeholder="Nieobowiązkowe"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'community'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="city">Miasto</InputLabel>
      <InputField
        v-model="company.city"
        id="city"
        placeholder="Nieobowiązkowe"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'city'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="propertyNumber">Numer nieruchomości</InputLabel>
      <InputField
        v-model="company.propertyNumber"
        id="propertyNumber"
        placeholder="Nieobowiązkowe"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'propertyNumber'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="apartmentNumber">Numer mieszkania</InputLabel>
      <InputField
        v-model="company.apartmentNumber"
        id="apartmentNumber"
        placeholder="Nieobowiązkowe"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'apartmentNumber'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="zipCode">Kod pocztowy</InputLabel>
      <InputField
        v-model="company.zipCode"
        id="zipCode"
        placeholder="Nieobowiązkowe"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'zipCode'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="street">Street</InputLabel>
      <InputField
        v-model="company.street"
        id="street"
        placeholder="Nieobowiązkowe"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'street'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="postCity">Poczta</InputLabel>
      <InputField
        v-model="company.postCity"
        id="postCity"
        placeholder="Nieobowiązkowe"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'postCity'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="phoneNumber">Numer telefonu</InputLabel>
      <InputField
        v-model="company.phoneNumber"
        id="phoneNumber"
        placeholder="Nieobowiązkowe"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'phoneNumber'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="email">E-mail</InputLabel>
      <InputField
        v-model="company.email"
        type="email"
        id="email"
        placeholder="Nieobowiązkowe"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'email'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputButton />
    <a
      @click="destroy(route.params.id)"
      href="#delete"
      class="btn btn-danger ml-3"
      >Usuń</a
    >
  </form>
  <AppAlert v-else>Brak danych</AppAlert>
  <p class="py-3">
    <RouterLink
      :to="{ name: 'companies.show', params: { id: route.params.id } }"
      class="btn"
      >Powrót</RouterLink
    >
  </p>
</template>
