// integrate api using rtk query

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const COURSE_API = "http://localhost:8080/api/v1/course/";
export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: 'include'
    }),
    tagTypes: ["creator-courses-data", "lecture-data"], //tag on data
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
        getPublishedCourse: builder.query({
            query: () => ({
                url: "/published-courses",
                method: "GET",
            }),
            providesTags: ['published-courses']
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
        publishCourse: builder.mutation({
            query: ({ courseId, query }) => ({
                url: `/${courseId}?publish=${query}`,
                method: "PATCH",
            }),
            invalidatesTags: ['creator-courses-data', 'published-courses']
        }),
        removeCourse: builder.mutation({
            query: ({ courseId }) => ({
                url: `/${courseId}`,
                method: 'DELETE'
            }
            ),
            invalidatesTags: ['creator-courses-data', 'published-courses']
        }),
        getCourseLecture: builder.query({
            query: (courseId) => ({
                url: `/${courseId}/lecture`,
                method: 'GET',
            }),
            providesTags: ['lecture-data'    ]

        }),
        editLecture: builder.mutation({
            query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: 'POST',
                body: { lectureTitle, videoInfo, isPreviewFree }
            })
        }),
        removeLecture: builder.mutation({   //to be called 
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['lecture-data']
        }),
        getLecture: builder.query({
            query: ({ lectureId }) => ({
                url: `/lecture/${lectureId}`,
                method: "GET",
            }),

        })
    })
});

//hooks
export const { useCreateCourseMutation, useCreatorCoursesQuery, useEditCourseMutation, useGetCourseByIdQuery, useCreateLectureMutation, useGetCourseLectureQuery, useEditLectureMutation, useRemoveLectureMutation, usePublishCourseMutation, useRemoveCourseMutation, useGetLectureQuery, useGetPublishedCourseQuery } = courseApi;