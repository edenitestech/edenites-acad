import { FaStar, FaUserAlt, FaPlayCircle } from 'react-icons/fa';
import * as S from './CourseCardStyles';

export const CourseCard = ({ course }) => {
  return (
    <S.CourseCardContainer data-aos="fade-up">
      <S.CourseImage>
        <S.PlayButton>
          <FaPlayCircle size={40} />
        </S.PlayButton>
        {course.isBestseller && <S.CourseBadge>Bestseller</S.CourseBadge>}
      </S.CourseImage>
      
      <S.CourseContent>
        <S.CourseCategory>{course.category}</S.CourseCategory>
        <S.CourseTitle>{course.title}</S.CourseTitle>
        <S.CourseDescription>{course.description}</S.CourseDescription>
        
        <S.CourseMeta>
          <S.CourseRating>
            <FaStar color="#f6b01e" />
            <span>{course.rating}</span>
            <S.CourseReviews>({course.reviews} reviews)</S.CourseReviews>
          </S.CourseRating>
          
          <S.CourseStudents>
            <FaUserAlt size={12} />
            <span>{course.students} students</span>
          </S.CourseStudents>
        </S.CourseMeta>
        
        <S.CourseFooter>
          <S.CoursePrice>${course.price}</S.CoursePrice>
          {course.originalPrice && (
            <S.CourseOriginalPrice>${course.originalPrice}</S.CourseOriginalPrice>
          )}
          <S.CourseButton>Enroll Now</S.CourseButton>
        </S.CourseFooter>
      </S.CourseContent>
      
      <S.CourseShimmer />
    </S.CourseCardContainer>
  );
};