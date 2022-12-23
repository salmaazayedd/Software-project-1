-- Insert Courses
INSERT INTO courses("code", "course", "facultyId")
	VALUES ('CSEN 504', 'Software Engineering I', 2);
INSERT INTO courses("code", "course", "facultyId")
	VALUES ('CSEN 405', 'Software Engineering', 1);

-- Insert Faculties
INSERT INTO faculties("faculty")
	VALUES ('Engineering - Mechanical');
INSERT INTO faculties("faculty")
	VALUES ('Engineering - Electrical');
INSERT INTO faculties("faculty")
	VALUES ('Computer Science - Software Engineering');
INSERT INTO faculties("faculty")
	VALUES ('Computer Science - Data Science');
INSERT INTO faculties("faculty")
	VALUES ('Computer Science - Security');

-- Insert Roles
INSERT INTO roles("role")
	VALUES ('student');
INSERT INTO roles("role")
	VALUES ('admin');

-- Set user role as Admin
UPDATE users
	SET "roleId"=2
	WHERE "email"='desoukya@gmail.com';