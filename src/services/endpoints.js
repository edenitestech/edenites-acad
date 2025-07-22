// src/services/endpoints.js
// Authentication
export const LOGIN = '/auth/login/';
export const REGISTER = '/auth/register/';
export const REFRESH_TOKEN = '/auth/token/refresh/';
export const LOGOUT = '/auth/logout/';
export const PROFILE = '/auth/profile/';
export const DASHBOARD_SUMMARY = '/auth/dashboard/';
export const CHANGE_PASSWORD = '/auth/password/change/';

// Courses
export const COURSES = '/courses/';
export const ENROLLED_COURSES = '/courses/enrolled/';
export const AVAILABLE_COURSES = '/courses/available/';
export const ENROLL_COURSE = (courseId) => `/courses/${courseId}/enroll/`;
export const UNENROLL_COURSE = (courseId) => `/courses/${courseId}/unenroll/`;
export const COURSE_DETAIL = (courseId) => `/courses/${courseId}/`;
export const ENROLLMENTS = '/enrollments/';

// Past Questions
export const EXAM_TYPES = '/exams/past-questions/types/';
export const EXAM_SUBJECTS = '/exams/past-questions/subjects/';
export const EXAM_YEARS = (examType, subjectSlug) => 
  `/exams/past-questions/years/?exam_type=${examType}&subject_slug=${subjectSlug}`;
export const EXAM_QUESTIONS = '/exams/past-questions/';

// Payments
export const INITIALIZE_PAYMENT = '/payments/initialize/';
export const VERIFY_PAYMENT = (reference) => `/payments/verify/${reference}/`;