import { api } from "../../api/index";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => "/contacts",
      providesTags: ["Contacts"],
    }),
    getContact: builder.query({
      query: (id) => "/contacts/" + id,
      providesTags: ["Contact"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact", "Contacts"],
    }),
    updateContact: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/contacts/${id}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: ["Contact", "Contacts"],
    }),
    addContact: builder.mutation({
      query: (credentials) => ({
        url: `/contacts/add`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = authApiSlice;
