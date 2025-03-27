import { useState } from "react";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    birthDate: "1990-01-01",
    email: "john.doe@example.com",
    address: "123 Main St",
  });
  const [image, setImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="flex space-x-6">
        <div>
          <img
            src={image || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
          <input title="Upload Image" type="file" onChange={handleImageChange} className="mt-2" />
        </div>
        <div className="space-y-4 flex-1">
          <p className="font-bold">{`${profile.firstName} ${profile.lastName}`}</p>
          <p>Frontend Leader</p>
          <input
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
          title="Birth Date"
            type="date"
            name="birthDate"
            value={profile.birthDate}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;