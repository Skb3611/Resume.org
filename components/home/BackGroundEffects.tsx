import ColorSpots from "./ColorSpots";

export function BackgroundEffects() {
    return (
      <>
      <div className="fixed inset-0 overflow-hidden opacity-40 pointer-events-none">
        <div className="bg-gradient absolute -left-[10%] -top-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-purple-900/10 to-transparent blur-[100px] animate-gradient-shift"></div>
        <div className="bg-gradient absolute right-[5%] top-[30%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-blue-900/5 to-transparent blur-[100px] animate-gradient-shift"></div>
        <div className="bg-gradient absolute bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-teal-900/5 to-transparent blur-[100px] animate-gradient-shift"></div>
      </div>

      {/* Color spots */}
      <ColorSpots
        numberOfSpots={4} 
        blur="xl"
        colors={['#9b87f5', '#D946EF', '#F97316', '#0EA5E9']}
      />
      </>
    );
  }