
import Navbar from "@/components/Navbar";
import ImageUpload from "@/components/ImageUpload";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Upload Your Images</h1>
          <p className="text-xl text-muted-foreground">
            Drag and drop or click to upload your favorite images
          </p>
        </div>
        <ImageUpload />
      </main>
    </div>
  );
};

export default Index;
