'use client';

import { Suspense } from 'react';
import { Lighting } from './Lighting';
import { Environment } from './Environment';
import { SkylineBackdrop } from './SkylineBackdrop';
import { RoadsAndPlaza } from './RoadsAndPlaza';
import { QevnHq } from './Buildings/QevnHq';
import { AiLab } from './Buildings/AiLab';
import { AutomationFactory } from './Buildings/AutomationFactory';
import { DataCenter } from './Buildings/DataCenter';
import { CommercialBuildings } from './Buildings/CommercialBuildings';
import { QevnCafe } from './Buildings/QevnCafe';
import { ProjectStreet } from './Buildings/ProjectStreet';
import { PostOffice } from './Buildings/PostOffice';
import { CentralStation } from './Buildings/CentralStation';
import { SecretSwitch } from './Buildings/SecretSwitch';
import { StreetProps } from './Props/StreetProps';
import { Vehicles } from './Vehicles';
import { NPCs } from './NPCs';
import { CityGuideMascot } from './CityGuideMascot';
import { Player } from './Player';
import { CameraController } from './CameraController';

export function TownWorld() {
  return (
    <Suspense fallback={null}>
      {/* Lighting & Atmospherics */}
      <Lighting />
      <Environment />
      <SkylineBackdrop />

      {/* Ground & Infrastructure */}
      <RoadsAndPlaza />
      <StreetProps />

      {/* Buildings & Campus */}
      <QevnHq />
      <AiLab />
      <AutomationFactory />
      <DataCenter />
      <CommercialBuildings />
      <QevnCafe />
      <ProjectStreet />
      <PostOffice />
      <CentralStation />
      <SecretSwitch />

      {/* Living City Dynamics */}
      <Vehicles />
      <NPCs />
      <CityGuideMascot />

      {/* Player Character & Camera */}
      <Player />
      <CameraController />
    </Suspense>
  );
}
