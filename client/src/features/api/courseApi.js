// integrate api using rtk query

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const COURSE_API = "http://localhost:8080/api/v1/course/";
export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: 'include'
    }),
    tagTypes: ["creator-courses-data"], //tag on data
    endpoints: (builder) => ({
        creatorCourses: builder.query({
            query: () => ({
                url: '',
                method: 'GET',
            }),
            //fetched data is linked to "creator-courses-data"
            providesTags: ['creator-courses-data']
        }),
        createCourse: builder.mutation({
            query: (inputData) => ({
                url: '',
                method: 'POST',
                body: inputData,
            }),
            //mark the "creator-courses-data" as outdated
            invalidatesTags: ['creator-courses-data']
        }),
        editCourse: builder.mutation({
            query: ({ formData, courseId }) => ({
                url: `/${courseId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ['creator-courses-data']

        }),
        getCourseById: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET"
            })
        }),
        createLecture: builder.mutation({
            query: ({ lectureTitle, courseId }) => ({
                url: `/${courseId}/lecture`,
                method: 'POST',
                body: { lectureTitle }

            })
        }),
        getCourseLecture: builder.query({
            query: (courseId) => ({
                url: `/${courseId}/lecture`,
                method: 'GET',
            })
        }),
        editLecture: builder.mutation({
            query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: 'POST',
                body: { lectureTitle, videoInfo, isPreviewFree }
            })
        }),
    })
});

//hooks
export const { useCreateCourseMutation, useCreatorCoursesQuery, useEditCourseMutation, useGetCourseByIdQuery, useCreateLectureMutation, useGetCourseLectureQuery, useEditLectureMutation } = courseApi;