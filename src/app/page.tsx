import HeroScene from "@/components/canvas/HeroScene";
import CatalogView from "@/components/ui/CatalogView";
import UploadComponent from "@/components/ui/UploadComponent";
import AlterationsPanel from "@/components/ui/AlterationsPanel";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* 3D Background Canvas */}
      <div className="fixed inset-0 -z-20 bg-background">
        <HeroScene />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        
        {/* Hero Section (tall enough to allow scrolling over the 3D model) */}
        <section className="h-[120vh] flex flex-col justify-center px-8 md:px-24 pointer-events-none">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter max-w-3xl leading-tight">
            Premium Custom <br/> Fairings
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-xl">
            High-fidelity 3D-printed motorcycle performance parts designed to spec.
          </p>
        </section>

        {/* Configuration Section */}
        <section className="min-h-screen bg-background/80 backdrop-blur-xl px-8 md:px-24 py-24 border-t border-border">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column: Catalog & Upload */}
            <div className="space-y-12">
              <CatalogView />
              <div>
                <h2 className="text-2xl font-bold mb-4">Or Upload Your Own Design</h2>
                <UploadComponent />
              </div>
            </div>

            {/* Right Column: Alterations & Checkout */}
            <div className="space-y-12">
              <AlterationsPanel />
              
              <div className="border border-accent/20 rounded-xl p-6 bg-accent/5 mt-4">
                <h3 className="text-xl font-bold text-accent mb-2">Order Summary</h3>
                <p className="text-sm text-gray-400 mb-6">Your final price will be calculated upon upload and selection.</p>
                <button className="w-full py-4 bg-accent text-white font-bold rounded-full hover:bg-amber-600 transition-colors shadow-[0_0_15px_rgba(217,119,6,0.4)] cursor-pointer">
                  Proceed to Checkout
                </button>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
